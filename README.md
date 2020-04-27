# cross-service-pages

An application to hold pages that do not belong to any single licence process

## Develop

```sh
npm run dev
```

## Test

```sh
npm run test
```

## Build

```sh
docker build -t naturescot/cross-service-pages .
```

## Run

```sh
docker run \
  --name cross-service-pages \
  --network licensing \
  -p "3004:3004" \
  --detach \
  naturescot/cross-service-pages
```

## License

Unless stated otherwise, the codebase is released under the [MIT License](LICENSE.txt). The documentation is available under the terms of the [Open Government Licence, Version 3](LICENSE-OGL.md).

This software uses [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) - see [LICENSE-GOVUK.txt](LICENSE-GOVUK.txt).

This software uses [Google Roboto](https://github.com/google/roboto) - see [LICENSE-ROBOTO.txt](LICENSE-ROBOTO.txt).
