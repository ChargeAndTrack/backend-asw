# backend-asw

ChargeAndTrack backend for the ASW project.

## How to use

Follow these steps in order to run the backend:
- clone the repository or downlaod the latest release;
- go to the root directory (`/backend-asw`);
- in order to setup the `.env` file needed for the _nodejsapp_ you can alternatively:
    - run the command`./setup_env.sh`
    - rename the `nodejs/.env.example` file as `nodejs/.env` and replace the `JWT_SECRET` value with a random string generated for example by:
        - `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
        - `head -c 32 /dev/urandom | xxd -p -c 64`
- replace the `HF_SECRET` in the `nodejs/.env` file with your Hugging Face token;
- run the following commands:
    ```
    $ docker compose build
    $ docker compose up
    ```

### How to run tests

To run the tests, simply execute the following commands instead of those in the last step:
```
$ docker compose -f docker-compose.test.yml build
$ docker compose -f docker-compose.test.yml up --abort-on-container-exit --exit-code-from nodejsapp-test
```
