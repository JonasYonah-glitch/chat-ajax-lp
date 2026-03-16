import { useState, useMemo } from 'react'
import { calculateRoi } from '../../lib/roi-calculator'
import { Container } from '../ui/Container'
import { SectionTag } from '../ui/SectionTag'
import { SectionTitle } from '../ui/SectionTitle'
import { Button } from '../ui/Button'
import { ArrowIcon } from '../../icons'

interface SliderConfig {
  key: string
  label: string
  min: number
  max: number
  step: number
  defaultValue: number
  suffix?: string
  prefix?: string
}

const sliders: SliderConfig[] = [
  { key: 'atendimentos', label: 'Atendimentos por mes', min: 50, max: 2000, step: 50, defaultValue: 500 },
  { key: 'agentes', label: 'Quantos atendentes voce tem', min: 1, max: 30, step: 1, defaultValue: 3 },
  { key: 'ticket', label: 'Valor medio por venda', min: 30, max: 800, step: 10, defaultValue: 200, prefix: 'R$' },
  { key: 'churnPercent', label: 'Clientes perdidos por demora', min: 3, max: 30, step: 1, defaultValue: 15, suffix: '%' },
]

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR')
}

function getTrackBackground(value: number, min: number, max: number): string {
  const percent = ((value - min) / (max - min)) * 100
  return `linear-gradient(to right, #5E17EB 0%, #5E17EB ${percent}%, #F0F0F0 ${percent}%, #F0F0F0 100%)`
}

export function RoiCalculator() {
  const [values, setValues] = useState<Record<string, number>>({
    atendimentos: 500,
    agentes: 3,
    ticket: 200,
    churnPercent: 15,
  })

  const results = useMemo(() => {
    return calculateRoi({
      atendimentos: values.atendimentos,
      agentes: values.agentes,
      ticket: values.ticket,
      churnPercent: values.churnPercent,
    })
  }, [values.atendimentos, values.agentes, values.ticket, values.churnPercent])

  const handleChange = (key: string, value: number) => {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  return (
    <section className="py-20 max-md:py-10 bg-white relative overflow-hidden" id="roi">
      {/* Geometric parallelogram bg accent */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#5E17EB]/4 pointer-events-none"
        style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      />

      <Container>
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <SectionTag>Calculadora</SectionTag>
          <SectionTitle
            title={
              <>
                Quanto voce pode <span className="serif-i">ganhar a mais</span>?
              </>
            }
            subtitle="Coloca seus numeros e veja o resultado na hora."
          />
        </div>

        {/* Hard-edge container */}
        <div className="grid grid-cols-2 max-md:grid-cols-1 border-2 border-[#131313]/10 overflow-hidden max-w-4xl mx-auto" style={{ boxShadow: '4px 4px 0 rgba(19,19,19,0.08)' }}>

          {/* LEFT: Sliders */}
          <div className="bg-white p-8 max-md:p-6">
            {sliders.map((slider, index) => {
              const value = values[slider.key]
              const displayValue = slider.prefix
                ? `${slider.prefix} ${formatBRL(value)}`
                : slider.suffix
                  ? `${formatBRL(value)}${slider.suffix}`
                  : formatBRL(value)

              return (
                <div
                  key={slider.key}
                  className={index < sliders.length - 1 ? 'pb-6 mb-6 border-b border-[rgba(0,0,0,.06)]' : ''}
                >
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor={`roi-slider-${slider.key}`}
                      className="text-[.85rem] font-semibold text-ajax-black uppercase tracking-[.04em]"
                    >
                      {slider.label}
                    </label>
                    <span className="text-[.95rem] font-bold text-[#5E17EB] tabular-nums">
                      {displayValue}
                    </span>
                  </div>
                  {/* Slider — custom square thumb via CSS */}
                  <input
                    id={`roi-slider-${slider.key}`}
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={value}
                    onChange={e => handleChange(slider.key, Number(e.target.value))}
                    style={{
                      background: getTrackBackground(value, slider.min, slider.max),
                    }}
                    className="w-full roi-slider"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[.72rem] text-ajax-black/50 uppercase tracking-[.04em]">
                      {slider.prefix ? `${slider.prefix} ${formatBRL(slider.min)}` : slider.suffix ? `${formatBRL(slider.min)}${slider.suffix}` : formatBRL(slider.min)}
                    </span>
                    <span className="text-[.72rem] text-ajax-black/50 uppercase tracking-[.04em]">
                      {slider.prefix ? `${slider.prefix} ${formatBRL(slider.max)}` : slider.suffix ? `${formatBRL(slider.max)}${slider.suffix}` : formatBRL(slider.max)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* RIGHT: Results */}
          <div className="bg-[#FAFAFA] p-8 max-md:p-6 flex flex-col justify-center border-l-2 border-[#131313]/10 max-md:border-l-0 max-md:border-t-2">

            {/* Receita perdida */}
            <div className="flex items-center justify-between py-3 border-b border-[rgba(0,0,0,.06)]">
              <span className="text-[.88rem] text-ajax-black/70 uppercase tracking-[.04em]">Dinheiro perdido por mes</span>
              <span className="text-[1rem] font-bold text-err tabular-nums">
                - R$ {formatBRL(results.perdida)}
              </span>
            </div>

            {/* Receita recuperada */}
            <div className="flex items-center justify-between py-3 border-b border-[rgba(0,0,0,.06)]">
              <span className="text-[.88rem] text-ajax-black/70 uppercase tracking-[.04em]">Vendas recuperadas</span>
              <span className="text-[1rem] font-bold text-ok tabular-nums">
                + R$ {formatBRL(results.recuperada)}
              </span>
            </div>

            {/* Economia */}
            <div className="flex items-center justify-between py-3 border-b border-[rgba(0,0,0,.06)]">
              <span className="text-[.88rem] text-ajax-black/70 uppercase tracking-[.04em]">Economia com a equipe</span>
              <span className="text-[1rem] font-bold text-ok tabular-nums">
                + R$ {formatBRL(results.economia)}
              </span>
            </div>

            {/* Investimento */}
            <div className="flex items-center justify-between py-3 border-b border-[rgba(0,0,0,.06)]">
              <span className="text-[.88rem] text-ajax-black/70 uppercase tracking-[.04em]">
                Custo do plano <span className="text-ajax-black/50 text-[.78rem] normal-case">({results.plano})</span>
              </span>
              <span className="text-[1rem] font-bold text-ajax-black tabular-nums">
                - R$ {formatBRL(results.invest)}
              </span>
            </div>

            {/* Ganho liquido — large purple number */}
            <div className="mt-6 mb-5">
              <span className="text-[.78rem] text-ajax-black/50 uppercase tracking-[.08em] font-bold block mb-1">
                O que voce ganha a mais por mes
              </span>
              <span
                className="text-[#5E17EB] block leading-[1.1] font-[900] tabular-nums"
                style={{ fontSize: '2.6rem' }}
              >
                R$ {formatBRL(results.ganho)}
              </span>
            </div>

            {/* Result cards — hard-edge, key metrics in purple */}
            <div className="flex gap-3 mb-6 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-white border-2 border-[#5E17EB] px-4 py-1.5 text-[.82rem] font-bold text-[#5E17EB] shadow-[2px_2px_0_#5E17EB]">
                ROI {formatBRL(results.roiPercent)}%
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border-2 border-[#131313]/20 px-4 py-1.5 text-[.82rem] font-bold text-ajax-black shadow-[2px_2px_0_rgba(19,19,19,.1)]">
                Payback {Math.round(results.paybackDays)} dias
              </span>
            </div>

            <Button href="#start" variant="primary" fullWidth>
              Comecar gratis por 14 dias <ArrowIcon size={16} />
            </Button>
          </div>
        </div>
      </Container>

      {/* Slider square thumb styles */}
      <style>{`
        .roi-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          border: none;
          outline: none;
          cursor: pointer;
        }
        .roi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #5E17EB;
          cursor: pointer;
          box-shadow: 2px 2px 0 rgba(94,23,235,0.4);
          border-radius: 0;
        }
        .roi-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #5E17EB;
          cursor: pointer;
          box-shadow: 2px 2px 0 rgba(94,23,235,0.4);
          border-radius: 0;
          border: none;
        }
        .roi-slider::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 0;
        }
        .roi-slider::-moz-range-track {
          height: 4px;
          border-radius: 0;
        }
      `}</style>
    </section>
  )
}
