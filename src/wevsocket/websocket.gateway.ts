import {
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class WebsocketGateway
    implements OnGatewayConnection,  OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;

    private activeSessions: number = 0;
    handleConnection(client: Socket): void {
        this.activeSessions++;
        client.emit('activeSessions', this.activeSessions);
        client.broadcast.emit('activeSessions', this.activeSessions);
        console.log(`Connected: ${client.id}`);
    }
    handleDisconnect(client: Socket) {
        this.activeSessions = Math.max(0, this.activeSessions - 1);
        this.server.emit('activeSessions', this.activeSessions);

        console.log(`Disconnected: ${client.id}`);
    }
    @SubscribeMessage('requestActiveSessions')
    handleRequestActiveSessions(@ConnectedSocket() client: Socket) {
        client.emit('activeSessions', this.activeSessions);
    }

}