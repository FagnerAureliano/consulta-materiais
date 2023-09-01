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

## Build Docker Image for Different Environments and Versions

To build a Docker image for different environments (dev, hom, prod) and versions, you can use the `--build-arg` option to specify the `ENV_CONFIG` value. Replace `[VERSION]` with the version number you are releasing.

### Prerequisites

Make sure you have Docker installed and running on your machine. You can download it from [Docker Official Site](https://www.docker.com/products/docker-desktop).


### Development Environment

```bash
docker build --build-arg ENV_CONFIG=dev -t material-apoio-fe:dev-[VERSION] .
```

### Homologation Environment

```bash
docker build --build-arg ENV_CONFIG=hom -t material-apoio-fe:hom-[VERSION] .
```

### Production Environment

```bash
docker build --build-arg ENV_CONFIG=prod -t material-apoio-fe:prod-[VERSION] .
```

Each command will build the Docker image and tag it according to the environment and version (e.g., material-apoio-fe:dev-1.0 for the development environment version 1.0).

## Running the Container

After building the image, you can run a container using the command below, replacing [TAG] and [VERSION] with the appropriate values:

```bash
docker run -d -p 4300:80 --name material-apoio-fe-container material-apoio-fe:[TAG]-[VERSION]
```

Visit `http://localhost:4300/consult-materials/#/materials/search` to access the application.

## Stopping and Removing the Container

To stop and remove the running container, execute the following commands:

```bash
docker stop material-apoio-fe-container
docker rm material-apoio-fe-container
```

## Push the image to registry (Harbor)

### Log in to the Docker Registry (Harbor in our case):

```bash
docker login https://registry.ccarj.intraer/ -u [YOUR-USERNAME] -p ['YOUR-PASSWORD']
```

### List existing Docker images on your local machine:

```bash
docker images
```

### Tag the local image for the Harbor registry:

```bash
docker tag material-apoio-fe:[TAG]-[VERSION] registry.ccarj.intraer/portaldeapoio/material-apoio:[TAG]-[VERSION]
```

### Push the tagged image to the Harbor registry:

```bash
docker push registry.ccarj.intraer/portaldeapoio/material-apoio:[TAG]-[VERSION] 
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
