import numpy as np
xs = np.linspace(0., 1., 100)
AAs = [(x**2) for x in xs]
aas = [(1-x)**2 for x in xs]
aAs = [2*x*(1-x) for x in xs]

data = [{'p': xs[i], 'aa': aas[i], 'AA': AAs[i], 'aA': aAs[i]} for i in range(len(xs))]
