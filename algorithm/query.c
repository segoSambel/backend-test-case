#include <stdio.h>
#include <string.h>

int main()
{
    char *input[] = {"xc", "dz", "bbb", "dz"};
    char *query[] = {"bbb", "ac", "dz"};

    int inputLength = sizeof(input) / sizeof(input[0]);

    int found[3] = {0, 0, 0};

    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < inputLength; j++)
        {
            if (strcmp(query[i], input[j]) == 0)
            {
                found[i] += 1;
            }
        }
    }

    printf("OUTPUT: [%d, %d, %d]\n", found[0], found[1], found[2]);
}
