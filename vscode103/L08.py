vals=[]
for x in range(30):
    if x%2==1:
        vals.append(x*x)
#same as: vals = [x*x for x in range(30) if x%2==1]

#find divisors
n = 120
divisors = [d for d in range(2, n+1) if n % d ==0]


def divisors(n):
    return [d for d in range(2, n) if n%d==0]
    
def is_prime(n):
    return len(divisors(n)) == 0

primes_under_1000 = [p for p in range(1001) if is_prime(p)]
# print(primes_under_1000)

{c for c in "this is a short sentence"} # generates the set of characters, including space, in that string
tuple(c for c in "this is a short sentence")


words = "a rose is a rose is a rose".split(" ")
wordset = set(words)
newdict = {w:words.count(w) for w in wordset}

def letter_count(string):
    words = [w for w in string]
    letterSet = set(words)
    dict = {w:words.count(w) for w in letterSet}
    return dict
    
print(letter_count("hello"))