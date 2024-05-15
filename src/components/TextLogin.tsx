import React from 'react';
interface propsTitle{
    titleLabel:string;
}
const TextLogin: React.FC<propsTitle> = ({titleLabel}) => {
    return (
        <div style={styles.container}>
            <span>{titleLabel}</span>
            
        </div>
    );
};

// Estilos inline para o componente
const styles = {
    container: {
        fontSize: '40px',  // Altere o tamanho da fonte conforme necessário
        fontWeight: 'bold' as const,  // Garante o tipo correto para a propriedade no TS
        display:'flex',
        justifyContent:'center',
        marginTop:'20px',
        marginBottom:'70px'
    },
    b2b: {
        color: '#02274F',  // Azul especificado
    },
    it: {
        color: '#FDCF00',  // Amarelo especificado
    }
};

export default TextLogin;
