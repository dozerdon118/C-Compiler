#include <stdlib.h>
int main(){ size_t n = 1024ull*1024ull*512ull; // 512MB
void *p = malloc(n);
if(!p) return 1;
volatile char *q = p; q[0]=1; // touch memory
return 0;
}
