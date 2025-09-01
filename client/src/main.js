const samples = {
'Hello': `#include <stdio.h>\nint main(){ printf("Hello, world!\\n"); return 0; }`,
'Sum (stdin)': `#include <stdio.h>\nint main(){ int a,b; if(scanf("%d %d", &a, &b)==2) printf("%d\\n", a+b); return 0; }`,
'Infinite loop': `int main(){ for(;;){} return 0; }`,
'Large alloc': `#include <stdlib.h>\nint main(){ size_t n = 1024ull*1024ull*512ull; void *p = malloc(n); if(!p) return 1; ((char*)p)[0]=1; return 0; }`
};


const sampleSelect = document.getElementById('sampleSelect');
for(const k of Object.keys(samples)){ const o = document.createElement('option'); o.value=k; o.textContent=k; sampleSelect.appendChild(o); }


cons
