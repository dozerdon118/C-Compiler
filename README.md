# C Compiler Website


Run the app (build+run):


docker compose up --build


This will start:
- server: http://localhost:3000 (API: POST /api/run)
- client: http://localhost:5173 (UI)


Environment variables (server):
- PORT (default 3000)


Security note: the server service requires access to Docker (binds /var/run/docker.sock) so it can launch isolated gcc runner containers. This is acceptable for a demo but has security implications (see Security section in this repo).


---


API: POST /api/run
Request JSON: { code: string, stdin?: string, std?: string, opt?: string }
- std: one of c99, c11, gnu11, c17, gnu17 (server maps to gcc flags)
- opt: O0,O1,O2,O3


Response JSON:
{
compile: { stderr: string, exitCode: number|null },
run: { stdout: string, stderr: string, exitCode: number|null, durationMs: number|null, timedOut: boolean }
}


---


Acceptance tests included under `samples/` and `test.sh` (manual curl commands).
