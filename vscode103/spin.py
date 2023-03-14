def main():
    # print(simplePigLatin("draw"))

    # print_long_words(['A','road','diverged','in','a','yellow','wood'], 4)

    # print(annealing_temp("ATGCATGCATGCATGCATGC"))

    # grades = {"aa": [78, 90, 56], "bb": [34, 56, 44], "cc": [99, 89, 85]}
    # print(highestGrade(grades))
    
    # shopping = [['Item', 'Quantity', 'Price per item in Dollars'], ['Bag of carrots', '3', '3'], ['Box of cookies', '2', '4'], ['Brie Cheese', '1', '4']]
    # total_cost(shopping)

    print(mystery(6, 5, 3))



def simplePigLatin(word):
    for i in range(len(word)):
        if word[i] in "aeiou":
            return word[i:] + word[:i] + "ay"
    return word + "ay"


def print_long_words(words,n):
    return print([word for word in words if len(word) >= n])


def annealing_temp(dna_string):
    count = 0
    for l in dna_string:
        if l == "G" or l == "C":
            count += 1
    
    return (81.5 + 0.41*(count/len(dna_string)) - (675/len(dna_string)))


def highestGrade(grades):
    highest = 0
    for key in grades:
        if sum(grades[key]) / len(grades[key]) > highest:
            highest = sum(grades[key]) / len(grades[key])
            highestKey = key
    return highestKey


def total_cost(shopping_list):
    total = 0
    for i in range(1, len(shopping_list)):
        total += int(shopping_list[i][1]) * int(shopping_list[i][2])
    return print(total)


def mystery(a, b, c):
    if b+c >= 10:
        return str(a) + str(b+c)
    else:
        return str(a) + str(0) + str(b+c)

        






main()

