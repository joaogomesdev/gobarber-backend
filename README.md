
# Recuperar Password

**Requesitos funcionais**

  - O Cliente deve poder recuperar a sua password informando o e-mail;
  - O Cliente deve receber um e-mail com as instruções para recuperar a password;
  - O Cliente deve poder fazer o reset da password;

**Requesitos não funcionais**

  - Utilizar Mailtrap para o teste de envios em ambiente de desenvolvimento;
  - Utilizar Amazon SES para envios em produção;
  - O envio de emails deve ser executado em segundo plano(Background job);
  
**Regras de negocio**

  - O link enviado por email para recuperar a password deve expirar em 2h;
  - O Cliente precisa confirmar a nova password ao fazer o reset da password;

# Atualização do Perfil

  **Requesitos funcionais**

  - O Cliente deve poder atualizar o nome , email e password;

  **Regras de negocio**

  - O Cliente não pode alterar o email para um email já utilizado;
  - Para atualizar a password é necessario indicar a password antiga;
  - Para atualizar a password é necessario confirmar a password;

# Painel do Barbeiro
  
  **Requesitos funcionais**

    - O Cliente  deve poder fazer a listagem das suas  marcações de um dia especifico;
    - O Barbeiro deve poder receber uma notificação sempre que houver uma nova marcação;
    - O Barbeiro deve poder visualizar as notificações não lidas;
    
  **Requesitos não funcionais**

    - As marcações do Barbeiro no dia devem ser armazenadas em cache;
    - As notificações do Barbeiro devem ser armazenadas no MongoDB;
    - As notificações do Barbeiro devem ser enviadas em tempo-real utilizando o Socket.io;
  
  **Regras de negocio**

    - A notificação deve ter um Status de lida ou de não lida para que o Barbeiro possa controlar;

# Agendamento de serviços

  **Requesitos funcionais**

    - O Cliente deve poder fazer a listagem de todos os barbeiros registados;
    - O Cliente deve poder fazer a listagem os dias de um mês com pelo menos um horário disponível de um barbeiro;
    - O Cliente deve poder fazer a listagem dos horários de um dia especifico de barbeiro;
    - O Cliente deve poder fazer uma reserva com um barbeiro;

  **Requesitos não funcionais**

    - A listagem de barbeiros deve ser armazenada em cache;
    
  **Regras de negocio**

    - Cada marcação deve durar 1h;
    - As marcações devem estar disponiveis das X(8) as X(18h) horas (Primeira marcação as X e a última as X - 1h);
    - O cliente não pode fazer uma marcação em um horário já ocupado;
    - O cliente não pode fazer uma marcação em um horário que já passou;
    - O cliente não pode fazer uma marcação consigo mesmo;