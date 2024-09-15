#include <stdio.h>

int main()
{
    int matrix[3][3] = {
        {1, 2, 0},
        {4, 5, 6},
        {7, 8, 9}};

    int sum_diagonal_a = 0;
    int sum_diagonal_b = 0;

    for (int i = 0; i < 3; i++)
    {
        sum_diagonal_a += matrix[i][i];
        sum_diagonal_b += matrix[i][3 - i - 1];
    }

    printf("Sum diagonal a: %d\n", sum_diagonal_a);
    printf("Sum diagonal b: %d\n", sum_diagonal_b);
    printf("Pengurangan diagonal a dan b: %d\n", sum_diagonal_a - sum_diagonal_b);
}
