# ConsultaMateriais

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.18.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4300/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Build Docker Image for Different Environments and Versions and Tag the Local Image for Push to registry (Harbor)

### Prerequisites

Make sure you have Docker installed and running on your machine. You can download it from [Docker Official Site](https://www.docker.com/products/docker-desktop).

### Registry Identification Tag

Prefixing the image name with "registry.ccarj.intraer" specifies the registry where the image is stored. It ensures that Docker interacts with the correct registry to pull or push the image, facilitating secure and organized storage of your Docker images.

### Namespace Segregation

Including "portaldeapoio/material-apoio-fe" in the tag helps in namespace segregation. It categorizes the image under a specific project or application ("portaldeapoio") and further classifies it under a specific service or component ("material-apoio-fe"). This level of segregation is beneficial for larger projects with multiple microservices or components.

### Build

To build a Docker image for different environments (dev, hom, prod) and versions (v0.0.1, v2.0.0, etc.), you must use the `--build-arg` option to specify the `ENV_CONFIG` value. Replace `[ENV]` with the environment tag desired and `[VERSION]` with the version number you are releasing.

e.g., docker build --build-arg ENV_CONFIG=[ENV] -t registry.ccarj.intraer/portaldeapoio/material-apoio-fe:[ENV]-v[VERSION] .

### Important Notice

In order to successfully build the Docker image for our application, it is imperative that the following commands are run in the root directory of the project repository.

### Development Environment

```bash
docker build --build-arg ENV_CONFIG=dev -t registry.ccarj.intraer/portaldeapoio/material-apoio-fe:dev-v0.0.1 .
```

### Homologation Environment

```bash
docker build --build-arg ENV_CONFIG=hom -t registry.ccarj.intraer/portaldeapoio/material-apoio-fe:hom-v2.0.0 .
```

### Production Environment

```bash
docker build --build-arg ENV_CONFIG=prod -t registry.ccarj.intraer/portaldeapoio/material-apoio-fe:prod-v5.0.1 .
```

Each command will build the Docker image and tag it according to the environment and version (e.g., registry.ccarj.intraer/portaldeapoio/material-apoio-fe:dev-v0.0.1 for the development environment version 0.0.1).

## Push the image to registry (Harbor)

Now a walkthrough for logging into a Harbor registry and pushing a Docker image. The commands are specific to the Harbor instance in Registry.ccarj.intraer.

### Prerequisites

Access credentials (username and password) for https://registry.ccarj.intraer/

### Step 1: Log in to the Harbor Registry

To log in, use the docker login command. Replace [YOUR-USERNAME] and ['YOUR-PASSWORD'] with your Harbor username and password. Note that the password is wrapped in single quotes to handle special characters.

Note: The https:// protocol is optional during login.

```bash
docker login https://registry.ccarj.intraer/ -u [YOUR-USERNAME] -p ['YOUR-PASSWORD']
```

### Step 2: List Local Docker Images

Before pushing an image, check the list of Docker images that are available on your local machine.

```bash
docker images
```

### Step 3: Push the Tagged Image to Harbor

Once the image is already tagged, you can push it to the Harbor registry using docker push. Again, replace [TAG]-v[VERSION] with your specific tag and version.

```bash
docker push registry.ccarj.intraer/portaldeapoio/material-apoio-fe:[TAG]-v[VERSION] 
```

## Running the Container

After building the image, if you want, you can run a container using the command below, replacing [TAG] and [VERSION] with the appropriate values:

```bash
docker run -d -p 4300:8080 --name material-apoio-fe-container registry.ccarj.intraer/portaldeapoio/material-apoio-fe:[TAG]-v[VERSION]
```

Visit `http://localhost:4300/#/materials/search` to access the application.

## Stopping and Removing the Container

To stop and remove the running container, execute the following commands:

```bash
docker stop material-apoio-fe-container
docker rm material-apoio-fe-container
```