# OdontoSaaS 🦷

Sistema SaaS para **gestão de clínicas odontológicas**, desenvolvido com React.  
O sistema organiza todo o fluxo clínico da clínica, desde a recepção do paciente até o pagamento final.

---

# Tecnologias Utilizadas

- React
- Vite
- TypeScript
- TailwindCSS
- Context API
- Recharts
- jsPDF / react-pdf (geração de documentos)

---

# Funcionalidades

## 1. Módulo de Gestão e Dashboard

### Painel de Controle
Resumo visual com estatísticas em tempo real:

- Pacientes atendidos no dia
- Faturamento diário
- Consultas agendadas
- Taxa de conversão de atendimentos

### Gráficos de Desempenho
Visualização do faturamento semanal utilizando **Recharts** com gráfico de área.

### Atividades Recentes
Lista rápida com os últimos pacientes atendidos na clínica.

---

# 2. Módulo de Agenda

### Calendário Semanal
Visualização dinâmica da agenda da clínica organizada por dias da semana.

### Resumo Diário
Informações rápidas sobre o dia selecionado:

- Número de consultas
- Horários disponíveis

### Ações Rápidas
Permite:

- Iniciar atendimento diretamente da agenda
- Acessar prontuário do paciente

---

# 3. Módulo de Recepção (OdontoTrack)

### Cadastro de Pacientes
Formulário completo para registro de novos pacientes:

- Nome
- Telefone
- Data
- Serviço inicial

### Busca Inteligente
Sistema de busca em tempo real para localizar pacientes cadastrados.

### Fluxo de Entrada
Seleção do paciente para iniciar o ciclo de atendimento no sistema.

---

# 4. Módulo de Avaliação Clínica

### Diagnóstico Digital
Registro de:

- Diagnóstico principal
- Histórico clínico
- Alergias
- Medicamentos

### Integração de Status
O sistema atualiza automaticamente o status do paciente para:

"Em avaliação"

### Início de Tratamento
Permite iniciar diretamente o plano de tratamento após avaliação.

---

# 5. Módulo de Tratamento e Orçamento

### Catálogo de Procedimentos

Lista de procedimentos odontológicos:

- Limpeza
- Clareamento
- Implante
- Ortodontia

Todos com valores pré-configurados.

### Plano de Tratamento
Permite adicionar múltiplos procedimentos ao atendimento.

### Calculadora em Tempo Real
Cálculo automático:

- Soma total
- Aplicação de descontos

---

# 6. Geração de Documentos PDF

O sistema gera documentos profissionais em PDF:

### Orçamentos
Lista completa de procedimentos com valores e total.

### Receituários
Prescrição de medicamentos com:

- Cabeçalho da clínica
- Posologia
- Assinatura do dentista

### Atestados
Atestados médicos com:

- Motivo
- Dias de repouso

### Encaminhamentos
Documento oficial para especialistas com observações clínicas.

---

# 7. Módulo Financeiro

### Checkout Multi-Forma

Suporte para pagamentos via:

- PIX
- Cartão
- Dinheiro

### Registro de Faturamento

Atualização automática do caixa após confirmação de pagamento.

### Finalização de Atendimento

Encerramento do atendimento com atualização do status do paciente para:

"Finalizado"

---

# Infraestrutura Técnica

### Autenticação

Sistema de login com níveis de acesso:

- Administrador
- Dentista
- Recepcionista

### Context API

Gerenciamento global de estado para:

- Pacientes
- Faturamento
- Notificações

### Design System

Componentes reutilizáveis criados com Tailwind:

- Botões
- Cards
- Inputs
- Modais

### TypeScript

Todo o projeto tipado para:

- maior segurança
- melhor manutenção
- menos bugs

---

# Como Rodar o Projeto

## Pré-requisitos

- Node.js instalado

Verifique com:
