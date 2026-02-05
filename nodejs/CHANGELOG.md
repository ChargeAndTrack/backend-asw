## [3.0.0](https://github.com/ChargeAndTrack/backend-asw/compare/2.0.0...3.0.0) (2026-02-05)

### ⚠ BREAKING CHANGES

* replace isCharging with currentChargingStationId in car interface and schema
* add currentCarId to ChargingStation, add isCharging to Car, improve checks in rechargeController and add emits for charging-station-updated
* add filters for enabled charging stations in getNearbyChargingStations and getClosestChargingStation handlers; update openapi
* **login:** add user role to login response and update openapi

### Features

* add cors to express app ([d9dc09f](https://github.com/ChargeAndTrack/backend-asw/commit/d9dc09feaf0ee9195d1bf9ddf78f2ea114c6820a))
* add currentCarId to ChargingStation, add isCharging to Car, improve checks in rechargeController and add emits for charging-station-updated ([3c6e960](https://github.com/ChargeAndTrack/backend-asw/commit/3c6e960f6c84c90b593d7aa7858d060a39825610))
* add filters for enabled charging stations in getNearbyChargingStations and getClosestChargingStation handlers; update openapi ([cab6790](https://github.com/ChargeAndTrack/backend-asw/commit/cab6790628cd4c415ea6e1972176963a2ade06ce))
* change error response format as json ([11497ea](https://github.com/ChargeAndTrack/backend-asw/commit/11497ea7fb0ddc1bbab47a063238814ce81814ac))
* **login:** add user role to login response and update openapi ([e65eb74](https://github.com/ChargeAndTrack/backend-asw/commit/e65eb745852994e0b3a563e84c5b321e05fb8d4a))
* replace isCharging with currentChargingStationId in car interface and schema ([fd1379b](https://github.com/ChargeAndTrack/backend-asw/commit/fd1379ba1c8736da6bd77a0006730b4c7a591ccd))
* **socket:** add listeners for join-charging-stations and leave-charging-stations ([dd67e8c](https://github.com/ChargeAndTrack/backend-asw/commit/dd67e8c60c6b8575c5ce9f82a1af12223e691865))

### Bug Fixes

* add positive number validation in zod schemas for charging station power ([ea0cd0b](https://github.com/ChargeAndTrack/backend-asw/commit/ea0cd0b8cee0c1d6da148399a38d89f6de5acfa4))
* **cars:** adapt readUserCars response to openapi specification and check plate validity ([3edefad](https://github.com/ChargeAndTrack/backend-asw/commit/3edefad171973b058fc9c962160afc3f9229f70a))
* **cars:** add unique plate check in updateCar and add positive number zod validation for car maxBattery ([278e3fb](https://github.com/ChargeAndTrack/backend-asw/commit/278e3fb10d86950d0c8814fe26bd3eaf712fa37a))
* **socket:** add cors option to socket.io Server, remove listener for rechargeUpdate event and start/stop-recharge events emit, add carId to recharge-update event args ([30fd230](https://github.com/ChargeAndTrack/backend-asw/commit/30fd230665b5d7e1bcaded22d3161c0cf0ceec24))
* **socket:** add cors origin address to server and remove chargingStationId parameter to start-recharge ([d175d38](https://github.com/ChargeAndTrack/backend-asw/commit/d175d38b659241eaccb6f4732f8158a434dc8613))
* **test:** adapt cars and recharge tests to last changes ([0cb3774](https://github.com/ChargeAndTrack/backend-asw/commit/0cb3774565a5ee1ded374dbb72d85446187a382e))

### Documentation

* add asw report ([acf41c1](https://github.com/ChargeAndTrack/backend-asw/commit/acf41c101754c1be948d53c73d6bf0ac7aec3342))
* update readme with complete usage instructions ([c774570](https://github.com/ChargeAndTrack/backend-asw/commit/c77457060015f6655466361a74335fd09e8fdf40))

### Build and continuous integration

* add cors dependency ([ced97da](https://github.com/ChargeAndTrack/backend-asw/commit/ced97da40f7c822d83a52176f0eeaf5d7fdb2353))

### Refactoring

* **cars:** extract getUserCars and getUserCar methods ([6427489](https://github.com/ChargeAndTrack/backend-asw/commit/6427489c4a5cd5d22086fce43f62298518aa0591))

## [2.0.0](https://github.com/ChargeAndTrack/backend-asw/compare/1.0.0...2.0.0) (2026-01-22)

### ⚠ BREAKING CHANGES

* **llm:** add filters in llm related queries; update openapi

### Features

* **llm:** add calls to logic (after obtaining llm json response); refine prompt and llmResponseSchema ([588ad7f](https://github.com/ChargeAndTrack/backend-asw/commit/588ad7fd638540e7de8985c38bc78aa900922de8))
* **llm:** add filters in llm related queries; update openapi ([44730cd](https://github.com/ChargeAndTrack/backend-asw/commit/44730cd7d82179799821566269da75922b66768f))
* **llm:** add route '/llm/search' and corresponding handler (partially complete); add llm zod schemas and HF_SECRET in config and .env.example ([3c5ed38](https://github.com/ChargeAndTrack/backend-asw/commit/3c5ed38294ed6a204a6225a8a756189fc143e40b))
* **login:** change login response to have directly token as property, so update openapi ([6ac210a](https://github.com/ChargeAndTrack/backend-asw/commit/6ac210abd06d3f420c2c278ccaa9e4715b77d0a5))
* **recharge:** add availability filter in stop recharge query ([60f783d](https://github.com/ChargeAndTrack/backend-asw/commit/60f783df70265bb4b868a80afd27dfcb16d967b9))

### Bug Fixes

* **ci:** rename build file dependency; inherit secrets ([8bdb9f7](https://github.com/ChargeAndTrack/backend-asw/commit/8bdb9f7dda5c52828ca35672c971aacdab939397))

### Tests

* add cars tests ([23dd007](https://github.com/ChargeAndTrack/backend-asw/commit/23dd00797d0e250210c27cfbf1e22be39626585a))
* add charging stations tests ([65c699f](https://github.com/ChargeAndTrack/backend-asw/commit/65c699f396887e902e619a7a8501bce7dcd0928b))
* add failing test for a get user request without passing the token ([e0b004e](https://github.com/ChargeAndTrack/backend-asw/commit/e0b004e9cf60cda6c01b7e91ee2844f556c749ed))
* add llm tests ([873e761](https://github.com/ChargeAndTrack/backend-asw/commit/873e76157d53bfe39df5b5f7c5fe0b56509aaf22))
* add location tests ([d5f6ca8](https://github.com/ChargeAndTrack/backend-asw/commit/d5f6ca8bdc6f49391bb044c3b0916f1f95c9048b))
* add login, get user tests and run.test.ts as entrypoint to run all tests ([56a2990](https://github.com/ChargeAndTrack/backend-asw/commit/56a2990daefc87b6d97c6bddb87e3e839fc1ef57))
* add recharge tests ([cb166de](https://github.com/ChargeAndTrack/backend-asw/commit/cb166de5984f8640ecfdc688b389f774ff6f3b38))
* update location tests ([e70565b](https://github.com/ChargeAndTrack/backend-asw/commit/e70565b64b440c8e0778f0aa8e2a75ffae6d44dc))

### Build and continuous integration

* add HF_SECRET in test job ([f537c19](https://github.com/ChargeAndTrack/backend-asw/commit/f537c19c4690de7008987b6e840869ff5ab68e06))
* **tests:** add supertest dependency; create a separate docker-compose file and setup accordingly ([8aa5025](https://github.com/ChargeAndTrack/backend-asw/commit/8aa5025fa2a29eaf794d69b7f2c43bf47b798475))
* **tests:** add test job ([1eb571b](https://github.com/ChargeAndTrack/backend-asw/commit/1eb571bbf7a0bd57efe9f9b3980fec5c98fc830c))

### Refactoring

* extract logic into separate functions ([5237931](https://github.com/ChargeAndTrack/backend-asw/commit/5237931ac4b15c2ad87fbb3d5fd906f17a93234e))
* move socket.io in a separate file ([60886a2](https://github.com/ChargeAndTrack/backend-asw/commit/60886a2c0ff7fc05a15029d40e2e8c6f59dd20a6))
* **test:** extract get, post and put charging stations requests into separate functions ([4a013e2](https://github.com/ChargeAndTrack/backend-asw/commit/4a013e294a18291fa2529fa8eb91f2d4bbe50825))
* **test:** extract login request in a function; rename cars tests ([b9f677b](https://github.com/ChargeAndTrack/backend-asw/commit/b9f677ba3b25dc0ae594982f3abc85a3c035bdfb))

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
