# tls-check-cli

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=floriandorau_tls-check-cli&metric=alert_status)](https://sonarcloud.io/dashboard?id=floriandorau_tls-check-cli)

Simple cli wrapper around [testssl](https://testssl.sh/).

## How to use

### Base commands

```shell-script
tlscheck <command>

Kommandos:
  tlscheck test <url>  Run tls check at target <url> [options]
  tlscheck install     Install latest testssl lib
  tlscheck check       Check tlscheck prerequisites

Optionen:
  --verbose     Print debug messages                    [boolean]
  --version     Version anzeigen                        [boolean]
  --help        Hilfe anzeigen                          [boolean]

Beispiele:
  tlscheck test https://google.com   Runs a tlscheck against https://google.com
```

### Install `testssl` prerequisite

In order to run `tlscheck` you need to have `testssl` installed locally. You can run `tlscheck check` to check if you can run a TLS test. Otherwise use `tlscheck install` to download latest `testssl` version to your local `tlscheck` installation. After that you can run TLS test.

### Test TLS config

With `tlscheck test <url>` you can check the TLS configuration of the given url.

Further options can be used like the following:

```shell-script
tlscheck test
Usage: tlscheck test <url> --severity [string] --format [string]

Positionals:
  url  URL to check tls configuration                    [string] [erforderlich]

Optionen:
  --verbose   Print debug messages                       [boolean]
  --version   Version anzeigen                           [boolean]
  --help      Hilfe anzeigen                             [boolean]
  --severity  Define severity level for test             [Möglichkeiten: "low", "medium", "high", "critical"] [Standard: "high"]
  --format    Format of report output                    [Möglichkeiten: "html", "json", "csv", "log"] [Standard: "html"]
```
