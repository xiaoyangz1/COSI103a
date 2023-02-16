'''This program construct Gaussian integers, add and multiply them, and print them.
'''

class Gaussian_Integer:
    def __init__(self, a, b):
        self.a = a
        self.b = b
    def __str__(self):
        return str(self.a) + " + " + str(self.b) + "i"
    def add(self, other):
        return Gaussian_Integer(self.a + other.a, self.b + other.b)
    def multiply(self, other):
        return Gaussian_Integer(self.a*other.a - self.b*other.b, self.a*other.b + self.b*other.a)
    
def main():
    u = Gaussian_Integer(1,1)
    v = Gaussian_Integer(1,2)
    w = u.multiply(u)
    x = u.add(v).add(w)
    print('u=',u)
    print('v=',v)
    print('w=',w)
    print('x=',x)

main()
    
