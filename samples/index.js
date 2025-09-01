// Minimal Express server that spawns ephemeral gcc runner containers via Docker CLI.
const dockerArgs = [
'run','--rm',
'--network','none',
'--cpus','0.5',
'-m','256m',
'--pids-limit','64',
'--read-only',
'--tmpfs','/tmp:rw,size=64m',
'-v', `${workdir}:/work:rw`,
'gcc:12',
'bash','-lc', inner
];


const dr = spawn('docker', dockerArgs, { stdio: ['ignore','pipe','pipe'] });


// collect container stdout/stderr for debug
let dstdout = ''; let dstderr = '';
dr.stdout.on('data', d=> dstdout += d.toString());
dr.stderr.on('data', d=> dstderr += d.toString());


dr.on('error', err => {
tmpDir.removeCallback();
return res.status(500).json({ error: 'Failed to run docker. Is /var/run/docker.sock mounted?' , detail: err.message });
});


dr.on('close', (code) => {
// read files from workdir
const read = (p) => { try { return fs.readFileSync(path.join(workdir,p),'utf8'); } catch(e){ return ''; } };
const compileStderr = read('compile.stderr');
const compileExit = fs.existsSync(path.join(workdir,'compile_exit')) ? 1 : 0;
const runStdout = read('stdout');
const runStderr = read('stderr');
const runExitRaw = read('run_exit').trim();
const runExit = runExitRaw === '' ? null : Number(runExitRaw);
const durationRaw = read('duration_ms').trim();
const durationMs = durationRaw === '' ? null : Number(durationRaw);
const timedOut = runExit === 124; // coreutils timeout returns 124 if timed out


// cleanup
tmpDir.removeCallback();


const result = {
compile: { stderr: compileStderr, exitCode: compileExit },
run: { stdout: runStdout, stderr: runStderr, exitCode: runExit, durationMs: durationMs, timedOut: timedOut }
};


// attach docker debug if compile+run empty and something went wrong
if(!compileStderr && !runStdout && !runStderr && dstderr) result.dockerStderr = dstderr;


res.json(result);
});


} catch (err) {
return res.status(500).json({ error: err.message });
}
});


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
