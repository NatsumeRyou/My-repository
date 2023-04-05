def inverte_string(s):
    resultado = ''
    for i in range(len(s) - 1, -1, -1):
        resultado += s[i]
    return resultado

string_original = input('Digite uma string: ')
string_invertida = inverte_string(string_original)
print('A string intertida é:', string_invertida)