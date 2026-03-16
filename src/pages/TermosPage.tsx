import { Container } from '../components/ui/Container'

export default function TermosPage() {
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
              Termos de <span className="serif-i">Uso</span>
            </h1>
            <p className="text-ajax-black/50 text-[.85rem] mb-10 uppercase tracking-[.04em] font-semibold">Ultima atualizacao: 01 de marco de 2026</p>

            <div className="prose-custom">
              <h2>1. Aceitacao dos Termos</h2>
              <p>
                Ao acessar e utilizar a plataforma Chat Ajax ("Servico"), voce concorda com estes Termos de Uso. Se voce nao concorda com algum destes termos, nao utilize o Servico.
              </p>

              <h2>2. Descricao do Servico</h2>
              <p>
                O Chat Ajax e uma plataforma de atendimento multicanal que permite centralizar conversas de WhatsApp, Instagram, Email e outros canais em uma unica interface, com recursos de inteligencia artificial integrados.
              </p>

              <h2>3. Cadastro e Conta</h2>
              <p>
                Para utilizar o Servico, voce deve criar uma conta fornecendo informacoes verdadeiras e completas. Voce e responsavel por manter a confidencialidade de sua senha e por todas as atividades que ocorram em sua conta.
              </p>

              <h2>4. Planos e Pagamento</h2>
              <p>
                O Chat Ajax oferece diferentes planos de assinatura. Os precos estao disponiveis na pagina de precos e podem ser alterados com aviso previo de 30 dias. O pagamento e recorrente e pode ser feito via PIX, boleto bancario ou cartao de credito.
              </p>
              <ul>
                <li>Periodo de teste gratuito de 14 dias, sem necessidade de cartao de credito</li>
                <li>Cancelamento pode ser feito a qualquer momento pelo painel</li>
                <li>Reembolso proporcional nos primeiros 7 dias apos a contratacao</li>
              </ul>

              <h2>5. Uso Aceitavel</h2>
              <p>Voce concorda em nao utilizar o Servico para:</p>
              <ul>
                <li>Enviar spam ou mensagens nao solicitadas em massa</li>
                <li>Violar leis aplicaveis, incluindo a LGPD</li>
                <li>Transmitir conteudo ilegal, difamatorio ou prejudicial</li>
                <li>Tentar acessar sistemas ou dados sem autorizacao</li>
                <li>Revender o Servico sem autorizacao expressa</li>
              </ul>

              <h2>6. Propriedade Intelectual</h2>
              <p>
                Todo o conteudo, design, codigo e marcas do Chat Ajax sao propriedade exclusiva da empresa. Voce mantem a propriedade dos dados que insere na plataforma.
              </p>

              <h2>7. Disponibilidade do Servico</h2>
              <p>
                Nos esforçamos para manter o Servico disponivel 99.9% do tempo. Manutencoes programadas serao comunicadas com antecedencia. Nao nos responsabilizamos por interrupcoes causadas por terceiros ou forca maior.
              </p>

              <h2>8. Limitacao de Responsabilidade</h2>
              <p>
                O Chat Ajax nao se responsabiliza por danos indiretos, incidentais ou consequenciais decorrentes do uso ou impossibilidade de uso do Servico. Nossa responsabilidade total esta limitada ao valor pago nos ultimos 12 meses.
              </p>

              <h2>9. Rescisao</h2>
              <p>
                Podemos suspender ou encerrar sua conta caso haja violacao destes Termos. Voce pode cancelar sua conta a qualquer momento. Apos o cancelamento, seus dados serao mantidos por 30 dias e depois permanentemente excluidos.
              </p>

              <h2>10. Alteracoes nos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes Termos a qualquer momento. Alteracoes significativas serao comunicadas por email com 30 dias de antecedencia. O uso continuado apos as alteracoes constitui aceitacao dos novos termos.
              </p>

              <h2>11. Legislacao Aplicavel</h2>
              <p>
                Estes Termos sao regidos pelas leis da Republica Federativa do Brasil. Quaisquer disputas serao resolvidas no foro da comarca de Sao Paulo, SP.
              </p>

              <h2>12. Contato</h2>
              <p>
                Para duvidas sobre estes Termos, entre em contato pelo email <a href="mailto:contato@chatajax.com">contato@chatajax.com</a>.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
