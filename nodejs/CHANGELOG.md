## [1.0.0](https://github.com/ChargeAndTrack/backend-asw/compare/0.4.0...1.0.0) (2026-01-19)

### ⚠ BREAKING CHANGES

* define API v1.0.0

### Features

* add route '/user' and corresponding handler getUser; remove route '/home'; rename controller as userController ([3fc4f7f](https://github.com/ChargeAndTrack/backend-asw/commit/3fc4f7fe43d2ecff1c05301da33441291b264ff6))
* define API v1.0.0 ([3a73545](https://github.com/ChargeAndTrack/backend-asw/commit/3a735456365a5af6482766c535a2757ac96e9754))
* **location:** add location schemas and update chargingStations schemas ([575ccd2](https://github.com/ChargeAndTrack/backend-asw/commit/575ccd2573fe7cff8935bf760247e1d6b7118cfb))
* **location:** add route '/location/resolve' and corresponding handler resolveAddressToCoordinates in new controller locationController ([756b85d](https://github.com/ChargeAndTrack/backend-asw/commit/756b85d68554a88d7bd44e191b126b920dd6d0d8))
* **location:** add route '/location/reverse' and corresponding handler reverseCoordinatesToAddress; rename closestChargingStationSchema as latitudeLongitudeSchema ([cde0922](https://github.com/ChargeAndTrack/backend-asw/commit/cde09220764ac867b060d4f12791a829ad1ade07))
* **location:** add routes '/charging-stations/near' and '/charging-stations/closest' and corresponding handlers getNearbyChargingStations and getClosestChargingStation ([6667c59](https://github.com/ChargeAndTrack/backend-asw/commit/6667c5964525273dfd3905bd2ac32603e510494f))
* **location:** get only enabled and available charging stations in getClosestChargingStation handler ([24fee6e](https://github.com/ChargeAndTrack/backend-asw/commit/24fee6ea14ed495462fb1a7a5e1f55bef34c0a49))
* **location:** in mongodb create index 2dsphere for location in chargingStations' collection ([89eb4ce](https://github.com/ChargeAndTrack/backend-asw/commit/89eb4ce3718c43054e6d51ecefbef6f5187de0d6))
* **location:** remove Map, Facility and Place interfaces, add GeoPoint interface, update ChargingStation interface and schema with location, add collection reference in user and chargingStation models ([f30f751](https://github.com/ChargeAndTrack/backend-asw/commit/f30f751df619f44979ea36a86d673f0dad47accb))
* **location:** remove unused endpoint '/map' ([42051db](https://github.com/ChargeAndTrack/backend-asw/commit/42051db4ea1e52ac03531d29c33d8c65e407379e))
* **recharge:** add recharge logic, start recharge zod schema and DTO ([cb27b17](https://github.com/ChargeAndTrack/backend-asw/commit/cb27b174c0b3733e3ea472059acae0558f4f68a8))
* **recharge:** add start-recharge route and define its handler, change charging stations style in route paths, setup server with socket.io ([3fdcbe1](https://github.com/ChargeAndTrack/backend-asw/commit/3fdcbe1c03a23be1e2bc7f4c810fa0592cf15c10))
* **recharge:** add stop recharge route, its handler and socket.io event; set charging station available when finish a recharge on rechargeWorker ([cd4e886](https://github.com/ChargeAndTrack/backend-asw/commit/cd4e886e99e43dad9bf397940434dd26eec86182))
* **recharge:** check charging station availability and set it to false when successfully start the recharge ([914b2e8](https://github.com/ChargeAndTrack/backend-asw/commit/914b2e81af79ca17e1031eca1afc76075efc3836))
* **recharge:** implement startRecharge handler, add rechargeWorker, make user cars field no more optional ([7bf49db](https://github.com/ChargeAndTrack/backend-asw/commit/7bf49db9c6d784c493d5c8f05d18968740009b0e))
* **recharge:** remove job scheduler in rechargeWorker when recharge complete, add start-recharge socket.io event on server.ts, rename recharge zod schema and DTO, add bounds to currentBattery in updateCarSchema ([b9b4e0f](https://github.com/ChargeAndTrack/backend-asw/commit/b9b4e0f5c330646b238f52b1194a9c2ef2499b75))
* **setup-zod:** add input validation for addChargingStation and updateChargingStation, remove available and enabled from addChargingStationSchema ([3694282](https://github.com/ChargeAndTrack/backend-asw/commit/3694282fbf9c3dd665d5536bc9f3622f3072ff14))
* **setup-zod:** add input validation for addUserCar and updateCar ([1a43444](https://github.com/ChargeAndTrack/backend-asw/commit/1a43444a5e650cb9d0efe9a4c3f343b6c1fbac92))
* **setup-zod:** define zod schemas and DTOs, add login input validation ([7cff135](https://github.com/ChargeAndTrack/backend-asw/commit/7cff1358947dee2fbed58a067d7627323a4fa4d5))

### Bug Fixes

* **recharge:** stop recharge handler now stops the correct recharge session ([06bd872](https://github.com/ChargeAndTrack/backend-asw/commit/06bd8721fa0a3f0f51fe833ac92f0749f8484748))

### Documentation

* define openapi v1.0.0 ([10e9e15](https://github.com/ChargeAndTrack/backend-asw/commit/10e9e15c00332107247a266994569eb0499a49e1))

### Build and continuous integration

* **recharge:** add redis service to docker compose; add ioredis, bullmq and socket.io dependencies ([5da0282](https://github.com/ChargeAndTrack/backend-asw/commit/5da02826b8035a7658394aaa793d6087939cd314))
* **setup-zod:** add zod dependency ([1e089de](https://github.com/ChargeAndTrack/backend-asw/commit/1e089de593551cd214614ad6a67b0fdd92d79381))

### General maintenance

* **recharge:** add redis configuration ([0cd2349](https://github.com/ChargeAndTrack/backend-asw/commit/0cd2349dee535d9a6f27184f1efae0f70be25355))

### Refactoring

* expand Request with user, so refactor using req.user instead of req.body.user ([1d061ce](https://github.com/ChargeAndTrack/backend-asw/commit/1d061ce15b8c35855a7f9386c99b3a64669d49bf))
* **location:** change routes '/chargingStations' to '/charging-stations' ([9230dfe](https://github.com/ChargeAndTrack/backend-asw/commit/9230dfe8dcd743e08cb73040f0ce02b67e5de1a4))
* **recharge:** add updateCarLogic method and UpdateCarMethod type in model to avoid repeating update user car query ([6b121e9](https://github.com/ChargeAndTrack/backend-asw/commit/6b121e9a5d037ddd47fb80d8bae9ec68e05ea570))
* **recharge:** remove controller when calling verifyLogin ([1f760a6](https://github.com/ChargeAndTrack/backend-asw/commit/1f760a6fe6297259217f0d9ac75006074e1e1c23))

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
