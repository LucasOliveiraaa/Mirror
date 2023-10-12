# Mirror

An UDP Server and Client for Remote Control

## About Mirror

Mirror is a remote control solution that enables users to control a computer remotely from anywhere with internet access. It addresses the challenge of transporting a desktop computer by allowing users to connect to a Mirror server and control the computer where the server is installed.

## How It Works

Mirror operates in two communication layers: the video layer and the input layer. Communication between the server and the client is established using the UDP protocol. Here's an overview of how it works:

### Video Layer

The video layer is initiated when the input layer sends client input data to the server. This layer is responsible for sending video frames from the server computer to the client. Users see the server computer's screen in real-time.

### Input Layer

The input layer is responsible for sending input data when client events are triggered. This includes keyboard, mouse, and mouse wheel events. When an event is triggered on the client, relevant information is sent to the server, which simulates the interaction on the server computer.

## Technologies Used

Mirror utilizes the following technologies and libraries:

- Node.js
- ElectronJS (using HTML and CSS for the Electron window)
- RobotJS for input replication
- Screenshot-desktop for screen capture

## Configuration and Usage

To set up and use Mirror, follow the steps below:

1. Install Node.js and NPM on your system.

2. Clone this repository and navigate to the project folder.

3. Run `npm install` to install the dependencies.

4. Configure the Mirror server on the computer you want to control remotely.

5. Expose port 2222 on your local network to allow the client to connect directly to the server.

6. Start the Mirror server.

7. Run the Mirror client on any computer with internet access.

8. Log in to the section created by the Mirror server.

9. You can now remotely control the computer where the Mirror server is installed.

## Security Considerations

To enhance security, Mirror is being improved with data encryption and a private room system that uses hashes for authentication.

## Limitations

The primary limitation of Mirror is the speed of the connection. Using internet communication can result in delays, so it's recommended to maintain a stable and relatively fast internet connection for optimal performance.

## Future Enhancements

Future plans for Mirror include support for server audio transmission, client microphone transmission, and support for multiple monitors.

## Reporting Issues and Providing Feedback

If you encounter issues or wish to provide feedback on Mirror, use the "Issues" section on GitHub to report problems or make suggestions.

## Usage Examples

Currently, we do not have documented usage examples, but we are considering adding videos and use cases in the future.
