## [0.3.0](https://github.com/ChargeAndTrack/backend-asw/compare/0.2.0...0.3.0) (2026-01-13)

### Features

* add db connection, user mongoose schema and model; change Role to type; move nodejsapp service in nodejs ([75d4de9](https://github.com/ChargeAndTrack/backend-asw/commit/75d4de9f0d9343e4e8716e0de5f14803c06b16ec))
* add login handler, config jwt and user sessions with tokens ([a67c862](https://github.com/ChargeAndTrack/backend-asw/commit/a67c8625eed551193c33298dac17f46b23be8ea8))
* add model interfaces ([e02806e](https://github.com/ChargeAndTrack/backend-asw/commit/e02806e70a74ed56f8cefd91311846987508cc43))
* **build:** add .env.example file and setup script, require .env file in config, update README with setup section ([e039234](https://github.com/ChargeAndTrack/backend-asw/commit/e039234869fda51a8b2f63307b669a3a0b7cadfd))
* **login:** add verifyAdminRole handler, export Role in user.ts ([736b044](https://github.com/ChargeAndTrack/backend-asw/commit/736b044196c61c70c24c48e3183f1079a4580629))

### Bug Fixes

* **build:** remove .env file and add it to .gitignore, add .dockerignore, add env_file in docker-compose nodejsapp service ([dd0314e](https://github.com/ChargeAndTrack/backend-asw/commit/dd0314ea67f2ab5065a5a174a2de2e61752ee635))
* **ci:** set working directory for npm steps and move release.config.cjs into nodejs ([111125f](https://github.com/ChargeAndTrack/backend-asw/commit/111125f84891f3fd647ed905f73eae056c35fecb))
* init db insertMany argument as array ([d49f6a4](https://github.com/ChargeAndTrack/backend-asw/commit/d49f6a41c83664a2f1b3868ada48ea72cb037212))
* **mongodb:** typo in admin document ([d3df84f](https://github.com/ChargeAndTrack/backend-asw/commit/d3df84ff4b3ebbcbbbe27ba2ab64aa85eca9eb13))

### Build and continuous integration

* add jsonwebtoken dependency ([2cd99d2](https://github.com/ChargeAndTrack/backend-asw/commit/2cd99d2e601db690413adce456f3c246897a674d))
* **build:** add docker and run docker compose build, remove nodejs steps ([06b94b2](https://github.com/ChargeAndTrack/backend-asw/commit/06b94b2a0548ab89575ecd58349364d2fd0cfd79))
* change docker hub image to build from ([d70580b](https://github.com/ChargeAndTrack/backend-asw/commit/d70580b01d414da7913699bd598051c175685523))
* setup docker and mongoDB ([780a6fb](https://github.com/ChargeAndTrack/backend-asw/commit/780a6fb441d3889b4bf4473b8fcc8aae6e7dd9e4))

### Refactoring

* specify route handlers types, refactor route paths, add router to server ([b2cc75c](https://github.com/ChargeAndTrack/backend-asw/commit/b2cc75c7e8df3dcc50bab470b5735852bf6fdb65))
