#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    char* string_awal = "NEGIE1";
    
    int length = strlen(string_awal);
    char huruf[length];
    char index = 0;

    for (int i = 0; i < length; i++)
    {
        if(!isdigit(string_awal[i])) {
            huruf[index++] = string_awal[i];
        }
    }

    for (int i = 0; i < index / 2; i++)
    {
        char tmp = huruf[i];
        huruf[i] = huruf[index - i - 1];
        huruf[index - i - 1] = tmp;
    }

    index = 0;
    char string_baru[length];
    for (int i = 0; i < length; i++)
    {
        if(!isdigit(string_awal[i])) {
            string_baru[i] = huruf[index++];
        } else {
            string_baru[i] = string_awal[i];
        }
    }
    
    printf("%s\n", string_baru);
}
