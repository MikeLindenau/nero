
# <%= name %>

- __Lead:__ <%= author %>
- __Version:__ <%= version %>

<%= description %>

## Running
This micro-service can be ran as part of a complete system or as a single isolated
unit.

### As a complete system
A special system repository is available that runs the complete system using Docker
and Fuge.

- [Gumspace: The complete system][System]


### Isolated mode
To make testing easier this micro-service can be ran in 'isolated' mode. This mode
allows testing over http using a well defined port. Please note isolated mode means
patterns are not exposed via mesh.

To run in isolated mode,

 - Clone this repository locally,
 - Run `npm install`,
 - Run `npm start isolated`,

__Note:__ You will need to know the cost of your vm if using Docker.

A simple http service is supported and can be called using Curl or other Rest client.
The default port is `8060`. It can be changed using the `SERVICE_PORT` environment
variable.


## Configuration

### Environment Variables
Various settings can be changed using environment variables, see the list below for
all available variable names.


#### SERVICE_HOST
  - The host to listen on in isolated mode.
  - Defaults to `localhost`

#### SERVICE_PORT
  - The port to listen on in isolated mode.
  - Defaults to `8060`

#### Isolated Mode
  - Starts isolated mode.
  - Defaults to `false`

## Messages Handled
<% if (messagesIn) { %>
This micro-service handles the following messages.

<% messagesIn.forEach(function(msg){ %>
### `<%= msg.pattern %>`
<%= msg.description %>
<% }); %>

<% } else { %>
This micro-service handles no messages.
<% } %>

## Messages Emitted
<% if (messagesOut) { %>
This micro-service handles the following messages.

<% messagesOut.forEach(function(msg){ %>
### `<%= msg.pattern %>`
<%= msg.description %>
<% }); %>

<% } else { %>
This micro-service emits no messages.
<% } %>

## Contributing



[gumspace]: http://www.gumspace.com/
[System]: https://bitbucket.org/gumspace/gs-system
