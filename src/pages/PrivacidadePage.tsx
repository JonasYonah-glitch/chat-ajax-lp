import { Container } from '../components/ui/Container'

export default function PrivacidadePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-full bg-[#5E17EB]/04 pointer-events-none"
          style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />
        <Container>
          <div className="max-w-[760px] mx-auto">
            <span className="inline-block text-[.72rem] font-bold uppercase tracking-[.12em] text-[#5E17EB] mb-4 px-3 py-1.5 border-2 border-[#5E17EB]/30 bg-[#5E17EB]/05">
              Legal
            </span>
            <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-[800] text-ajax-black mb-2 uppercase tracking-[.02em]">
              Politica de <span className="serif-i">Privacidade</span>
            </h1>
            <p className="text-ajax-black/60 text-[.85rem] mb-10 uppercase tracking-[.04em] font-semibold">Ultima atualizacao: 01 de marco de 2026</p>

            <div className="prose-custom">
              <h2>1. Introducao</h2>
              <p>
                A Ajax Hub ("nos"), desenvolvedora do Chat Ajax, valoriza sua privacidade. Esta Politica descreve como coletamos, usamos, armazenamos e protegemos seus dados pessoais em conformidade com a Lei Geral de Protecao de Dados (LGPD - Lei 13.709/2018).
              </p>

              <h2>2. Dados que Coletamos</h2>
              <h3>Dados fornecidos por voce:</h3>
              <ul>
                <li>Nome, email e telefone ao criar sua conta</li>
                <li>CPF ou CNPJ para faturamento</li>
                <li>Dados de pagamento (processados por gateway seguro)</li>
                <li>Conteudo das mensagens trocadas na plataforma</li>
              </ul>
              <h3>Dados coletados automaticamente:</h3>
              <ul>
                <li>Endereco IP e dados de navegacao</li>
                <li>Tipo de dispositivo e navegador</li>
                <li>Dados de uso e interacao com a plataforma</li>
                <li>Cookies essenciais e de desempenho</li>
              </ul>

              <h2>3. Como Usamos seus Dados</h2>
              <ul>
                <li>Fornecer e manter o Servico</li>
                <li>Processar pagamentos e gerenciar assinaturas</li>
                <li>Enviar comunicacoes sobre o Servico (atualizacoes, seguranca)</li>
                <li>Melhorar a experiencia do usuario e desenvolver novos recursos</li>
                <li>Cumprir obrigacoes legais e regulatorias</li>
              </ul>

              <h2>4. Base Legal para Tratamento</h2>
              <p>Tratamos seus dados com base nas seguintes hipoteses da LGPD:</p>
              <ul>
                <li><strong>Execucao de contrato:</strong> para fornecer o Servico contratado</li>
                <li><strong>Consentimento:</strong> para comunicacoes de marketing (revogavel a qualquer momento)</li>
                <li><strong>Interesse legitimo:</strong> para melhorar o Servico e prevenir fraudes</li>
                <li><strong>Obrigacao legal:</strong> para cumprimento de exigencias fiscais e regulatorias</li>
              </ul>

              <h2>5. Compartilhamento de Dados</h2>
              <p>Seus dados podem ser compartilhados com:</p>
              <ul>
                <li><strong>Processadores de pagamento:</strong> para processar transacoes financeiras de forma segura</li>
                <li><strong>Provedores de infraestrutura:</strong> servidores hospedados no Brasil</li>
                <li><strong>Autoridades competentes:</strong> quando exigido por lei ou ordem judicial</li>
              </ul>
              <p>Nao vendemos seus dados pessoais a terceiros.</p>

              <h2>6. Armazenamento e Seguranca</h2>
              <ul>
                <li>Dados armazenados em servidores no Brasil</li>
                <li>Criptografia em transito (TLS 1.3) e em repouso (AES-256)</li>
                <li>Backups diarios com retencao de 30 dias</li>
                <li>Controle de acesso baseado em funcao (RBAC)</li>
                <li>Monitoramento continuo de seguranca</li>
              </ul>

              <h2>7. Seus Direitos (LGPD)</h2>
              <p>Voce tem direito a:</p>
              <ul>
                <li>Confirmar a existencia de tratamento de seus dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar anonimizacao ou eliminacao de dados desnecessarios</li>
                <li>Portabilidade dos dados a outro fornecedor</li>
                <li>Revogar consentimento a qualquer momento</li>
              </ul>
              <p>
                Para exercer seus direitos, envie um email para <a href="mailto:privacidade@ajax.dev.br">privacidade@ajax.dev.br</a>. Responderemos em ate 15 dias uteis.
              </p>

              <h2>8. Retencao de Dados</h2>
              <ul>
                <li>Dados de conta: mantidos enquanto a conta estiver ativa</li>
                <li>Apos cancelamento: dados excluidos em ate 30 dias</li>
                <li>Dados fiscais: mantidos por 5 anos conforme legislacao</li>
                <li>Logs de acesso: mantidos por 6 meses (Marco Civil da Internet)</li>
              </ul>

              <h2>9. Cookies</h2>
              <p>
                Utilizamos cookies essenciais para o funcionamento da plataforma e cookies de desempenho para melhorar a experiencia. Voce pode gerenciar suas preferencias de cookies nas configuracoes do navegador.
              </p>

              <h2>10. Alteracoes nesta Politica</h2>
              <p>
                Podemos atualizar esta Politica periodicamente. Alteracoes significativas serao comunicadas por email. A versao atual sempre estara disponivel nesta pagina.
              </p>

              <h2>11. Contato do DPO</h2>
              <p>
                Para questoes relacionadas a privacidade e protecao de dados, entre em contato com nosso Encarregado de Dados (DPO):
              </p>
              <p>
                Email: <a href="mailto:privacidade@ajax.dev.br">privacidade@ajax.dev.br</a>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
