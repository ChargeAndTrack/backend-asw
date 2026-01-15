## [0.4.0](https://github.com/ChargeAndTrack/backend-asw/compare/0.3.0...0.4.0) (2026-01-15)

### Features

* **query-cars:** add car schema and update user schema ([657225c](https://github.com/ChargeAndTrack/backend-asw/commit/657225cb32ab4bcd48366517675e95b23e380239))
* **query-cars:** change default of cars in userSchema ([47a5ee3](https://github.com/ChargeAndTrack/backend-asw/commit/47a5ee3c58192cc2c127565c965caa324095de2d))
* **query-cars:** define routes and empty cars controller ([80831f1](https://github.com/ChargeAndTrack/backend-asw/commit/80831f103485e8254f7102793a68753dbd0352b1))
* **query-cars:** implement deleteCar handler ([c8bd093](https://github.com/ChargeAndTrack/backend-asw/commit/c8bd093360365594fe2ce0f4e2c62618fe125a6a))
* **query-cars:** implement readUserCars, addUserCar and readCar handlers ([41f40c7](https://github.com/ChargeAndTrack/backend-asw/commit/41f40c7f17c5980d0cfda704ebb39a97b29d9d73))
* **query-cars:** implement updateCar handler ([41b0471](https://github.com/ChargeAndTrack/backend-asw/commit/41b0471175151c57ea4d712d6a81c07929de916c))
* **query-charging-stations:** add charging station schema and model ([6be22b1](https://github.com/ChargeAndTrack/backend-asw/commit/6be22b1750d70f0d4705dd6afc9dd07418a98c5f))
* **query-charging-stations:** define delete charging station route and its handler ([0d13816](https://github.com/ChargeAndTrack/backend-asw/commit/0d1381672ec527b626e3c1cc68704ba3efe4dc89))
* **query-charging-stations:** define routes and handlers in chargingStationsController ([3cd3b0f](https://github.com/ChargeAndTrack/backend-asw/commit/3cd3b0f79601c183f3b25cc85575becf2c301642))
* **query-charging-stations:** implement listChargingStations and addChargingStation handlers ([d246546](https://github.com/ChargeAndTrack/backend-asw/commit/d246546c9acb92c46ba55f9c6f65a809e01920bf))
* **query-charging-stations:** implement updateChargingStation handler ([66a3e85](https://github.com/ChargeAndTrack/backend-asw/commit/66a3e855f42e5c4b7d6aff52e3c8b3a43a82c1de))
* **query-charging-stations:** rename delete charging station handler, implement getChargingStation and removeChargingStation handlers ([2cda6a8](https://github.com/ChargeAndTrack/backend-asw/commit/2cda6a8bc529def4e1d3ace84a721ae44c8178b7))

### Bug Fixes

* **login:** propagate request body after verifyLogin ([99083ee](https://github.com/ChargeAndTrack/backend-asw/commit/99083eeeb39ea107f4a1c1146d73f934b2a0a7b8))

### Refactoring

* add loginController ([1d3d141](https://github.com/ChargeAndTrack/backend-asw/commit/1d3d141ea0817a6cb8a23144b75e35831f2d85f6))
* change handlers from callbacks to async/await ([b7cc260](https://github.com/ChargeAndTrack/backend-asw/commit/b7cc260580fe4befc143d61d4b179acbc3f14f6c))

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
