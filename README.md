# backend-asw

Backend for the ASW project.

## Setup

In order to setup the `.env` file needed for the _nodejsapp_ you can alternatively:
- run the command`./setup_env.sh`
- rename the `nodejs/.env.example` file as `nodejs/.env` and replace the `JWT_SECRET` value with a random string generated for example by:
    - `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
    - `head -c 32 /dev/urandom | xxd -p -c 64`
