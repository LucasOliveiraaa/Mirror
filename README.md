# Mirror

An UDP Server and Client to Remote Control

## How it works?
The Mirror is divided in two sides, the server and the client, the data flows in fixed times:
    1. The Server sends a screenshot to the client.
    2. The client recive this image and shows in the window.

But this just share the screen of the server with the client, now, lets see how the inpus are sended to the server:
    1. The window add listeners to key events and mouse events.
    2. When any key or mouse event is dispached, the relevant informations is sended to the server.
    3. The server recive the data and simule the interaction.

With this two loops, the client can control the server remotely using the high speed of UDP Protocol.
