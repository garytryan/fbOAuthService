node_path = NODE_PATH=./bin:.:./node_modules:`npm root`
ava = ${node_path} ./node_modules/ava/cli.js bin/**/*.test.{js,jsx}
tsc = ./node_modules/typescript/bin/tsc
clean = rm -rf ./bin

.PHONY: default prod dev app test test-watch watch-tsc

default:
	${clean} && ${tsc}

prod:
	${node} 'index.ts'

watch-tsc:
	${clean} && ${tsc} -w

test:
	${clean} && ${tsc} && ${ava}

test-watch:
	${ava} --watch

dev:
	${node} './bin/src/index.js'
