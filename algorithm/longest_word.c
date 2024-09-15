#include <stdio.h>
#include <string.h>

int main()
{
    char *sentence = "Saya sangat senang mengerjakan soal algoritma";

    int length = 0;
    int longest = 0;
    int longestIndex = 0;
    int currentWordStart = 0;

    for (int i = 0; i <= strlen(sentence); i++)
    {
        if (sentence[i] == ' ' || sentence[i] == '\0')
        {
            length = i - currentWordStart;
            if (length > longest)
            {
                longest = length;
                longestIndex = currentWordStart;
            }

            currentWordStart = i + 1;
        }
    }

    printf("%.*s: %d\n", longest, &sentence[longestIndex], longest);
}
