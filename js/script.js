	function exibeProximoBotao(){
		$('#proximo').show();
		$('#salvar').hide();
	}
	
	function exibirMensagem(mensagem,erro) {
		$('#mensagem').empty();
		if (Array.isArray(mensagem.responseJSON)) {
			mensagem.responseJSON.forEach(function (msg) {
				var paragraph = $('<p>').text(msg.replace(/\\n/g, '\n'));
				$('#mensagem').append(paragraph);
			});
		} else if (typeof mensagem.responseJSON === 'object' && mensagem.responseJSON.message) {
			var paragraph = $('<p>').text(mensagem.responseJSON.message.replace(/\\n/g, '\n'));
			$('#mensagem').append(paragraph);
		} else {
			var msg = mensagem.responseText ? mensagem.responseText : mensagem.responseJSON ? mensagem.responseJSON : mensagem
			var paragraph = $('<p>').text(msg);
			$('#mensagem').append(paragraph);
		}
		formatModalMensagem(erro)
	}
	
	function formatModalMensagem(erro){
		if (erro) {
			//erro
            $('#modalMensagem .modal-header').removeClass('bg-success').addClass('bg-danger');
            $('#modalMensagem .modal-title').text('Dados Inconsistentes');
            //$('#modalMensagem .modal-body').html('<p>Requisição bem-sucedida!</p>');
		} else {
            //sucesso
            $('#modalMensagem .modal-header').removeClass('bg-danger').addClass('bg-success');
            $('#modalMensagem .modal-title').text('Sucesso');
            //$('#modalMensagem .modal-body').html('<p>Requisição bem-sucedida!</p>');
		}
		$('#modalMensagem').modal('show');
	}
	
	function formatarData(data) {
		if (data) {
			var dataObj = new Date(data);
			var dia = String(dataObj.getDate()).padStart(2, '0');
			var mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Mês é base 0
			var ano = dataObj.getFullYear();
			return dia + '/' + mes + '/' + ano;
		}
		return "";
	}
	
	function obterDadosViaCep() {
		var cep = $('#cep').val().replace(/\D/g, ''); // Remove caracteres não numéricos do CEP

		// Verifica se o CEP possui a quantidade correta de dígitos
		if (cep.length === 8) {
			// Faz a requisição ao Viacep
			$.ajax({
				url: 'https://viacep.com.br/ws/' + cep + '/json/',
				dataType: 'json',
				success: function(data) {
					// Preenche os campos do formulário com os dados obtidos
					$('#logradouro').val(data.logradouro);
					$('#bairro').val(data.bairro);
					$('#cidade').val(data.localidade);
					$('#uf').val(data.uf);
				},
				error: function() {
					console.error('Erro ao obter dados do CEP.');
					exibirMensagemErro('Erro ao obter dados do CEP.');
				}
			});
		}
	}

	function getUserName() {
		return localStorage.getItem('nome');
	}

	function generateNickname(name) {
            if (!name) return '';

            var words = name.split(' ');

            var initials = words.map(function(word) {
				if (word.length > 3)
					return word.charAt(0).toUpperCase();
            });

            return initials.join('');
	}

	function updateUserName() {
		var userNameSpan = document.getElementById('userNameSpan');
		var userName = getUserName();
		var nickname = generateNickname(userName);

		if (nickname) {
			userNameSpan.textContent = 'Olá, ' + nickname + '!';
		}
	}