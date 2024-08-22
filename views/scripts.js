document.addEventListener('DOMContentLoaded', () => {
    // Função para carregar clientes
    const carregarClientes = async () => {
      try {
        const response = await fetch('/api/clientes'); // Requisição para a API
        if (!response.ok) throw new Error('Erro ao carregar clientes');
        
        const clientes = await response.json(); // Parse do JSON da resposta
        
        const clienteSelect = document.getElementById('cliente'); // Obtém o elemento <select>
        clienteSelect.innerHTML = ''; // Limpa opções existentes
        
        // Adiciona a opção padrão
        const optionDefault = document.createElement('option');
        optionDefault.textContent = 'Selecione um cliente';
        optionDefault.value = '';
        clienteSelect.appendChild(optionDefault);
        
        // Preenche o <select> com as opções dos clientes
        clientes.forEach(cliente => {
          const option = document.createElement('option');
          option.value = cliente._id; // Assumindo que o ID do cliente é '_id'
          option.textContent = cliente.nomeCompleto; // Assumindo que o nome do cliente é 'nomeCompleto'
          clienteSelect.appendChild(option);
        });
        
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };

    document.addEventListener('DOMContentLoaded', () => {
        fetch('/api/clientes')
          .then(response => response.json())
          .then(data => {
            const clienteSelect = document.getElementById('cliente');
            data.forEach(cliente => {
              const option = document.createElement('option');
              option.value = cliente._id;
              option.textContent = cliente.nomeCompleto;
              clienteSelect.appendChild(option);
            });
          });
      });
    
    carregarClientes(); // Chama a função para carregar os clientes
  });
  