import sys
import vsc_hello as hey

if len(sys.argv) == 2:
    name = sys.argv[1]
else:
    name = 'stranger'
    hey.hiya()
print(f'Hi there, {name}')