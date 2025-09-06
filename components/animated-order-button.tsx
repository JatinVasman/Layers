"use client"

import { useState } from "react"

interface AnimatedOrderButtonProps {
  onOrder: () => void
  className?: string
}

export function AnimatedOrderButton({ onOrder, className = "" }: AnimatedOrderButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      onOrder()
      
      // Reset animation after 10 seconds
      setTimeout(() => {
        setIsAnimating(false)
      }, 10000)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`order relative h-[63px] w-[240px] rounded-[32px] bg-[#1C212E] cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-[0.98] active:scale-[0.96] ${className} ${
        isAnimating ? 'animate' : ''
      }`}
      style={{
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        appearance: 'none',
        border: 0,
        padding: 0,
        outline: 'none',
        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Default Text */}
      <span 
        className={`default absolute left-0 right-0 text-center top-[19px] leading-6 text-white text-base font-medium transition-opacity duration-300 ${
          isAnimating ? 'opacity-0 delay-0' : 'opacity-100 delay-300'
        }`}
      >
        Order Now
      </span>
      
      {/* Success Text */}
      <span 
        className={`success absolute left-0 right-0 text-center top-[19px] leading-6 text-white text-base font-medium transition-all duration-300 ${
          isAnimating ? 'opacity-100 delay-[7s]' : 'opacity-0 delay-0'
        }`}
        style={{
          transform: isAnimating ? 'translateY(0)' : 'translateY(16px)',
        }}
      >
        Order Placed
        <svg 
          className="inline-block w-3 h-[10px] ml-1 mt-[7px] fill-none stroke-[#16BF78] stroke-2 stroke-linecap-round stroke-linejoin-round"
          viewBox="0 0 12 10"
          style={{
            strokeDasharray: '16px',
            strokeDashoffset: isAnimating ? '0' : '16px',
            transition: 'stroke-dashoffset 0.3s ease',
            transitionDelay: isAnimating ? '7.3s' : '0s',
          }}
        >
          <polyline points="1.5 6 4.5 9 10.5 1" />
        </svg>
      </span>

      {/* Box */}
      <div 
        className={`box absolute w-[21px] h-[21px] top-[21px] right-full rounded-[2px] bg-gradient-to-b from-[#EDD9A9] to-[#DCB773] ${
          isAnimating ? 'animate-box' : ''
        }`}
        style={{
          animation: isAnimating ? 'box 10s ease forwards' : 'none',
        }}
      >
        <div className="absolute top-[10px] left-0 right-0 h-[3px] -mt-[1px] bg-black/10" />
        <div className="absolute top-[10px] left-0 right-0 h-[1px] bg-black/15" />
      </div>

      {/* Truck */}
      <div 
        className={`truck absolute w-[60px] h-[41px] left-full top-[11px] z-[1] ${
          isAnimating ? 'animate-truck' : ''
        }`}
        style={{
          transform: 'translateX(24px)',
          animation: isAnimating ? 'truck 10s ease forwards' : 'none',
        }}
      >
        {/* Truck doors */}
        <div 
          className={`absolute h-[2px] w-[20px] right-[58px] block bg-white rounded-[1px] origin-[100%_50%] ${
            isAnimating ? 'animate-door1' : ''
          }`}
          style={{
            transform: 'rotate(-90deg)',
            animation: isAnimating ? 'door1 2.4s ease forwards 0.3s' : 'none',
          }}
        />
        <div 
          className={`absolute h-[2px] w-[20px] right-[58px] bottom-[4px] block bg-white rounded-[1px] origin-[100%_50%] ${
            isAnimating ? 'animate-door2' : ''
          }`}
          style={{
            transform: 'rotate(90deg)',
            animation: isAnimating ? 'door2 2.4s ease forwards 0.6s' : 'none',
          }}
        />

        {/* Truck back */}
        <div className="back absolute left-0 top-0 w-[60px] h-[41px] z-[1] rounded-[2px] bg-gradient-to-b from-white to-[#CDD9ED]" />

        {/* Truck front */}
        <div className="front absolute overflow-hidden rounded-[2px_9px_9px_2px] w-[26px] h-[41px] left-[60px]">
          <div className="absolute h-[13px] w-[2px] left-0 top-[14px] bg-gradient-to-b from-[#6C7486] to-[#3F4656]" />
          <div className="absolute rounded-[2px_9px_9px_2px] bg-[#275EFE] w-[24px] h-[41px] right-0" />
          
          {/* Window */}
          <div 
            className="window absolute overflow-hidden rounded-[2px_8px_8px_2px] bg-[#7699FF] w-[22px] h-[41px] left-[2px] top-0 z-[1]"
            style={{
              transform: 'perspective(4px) rotateY(3deg)',
              transformOrigin: '0 50%',
            }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-[14px] bg-[#1C212E]" />
            <div 
              className="absolute right-0 w-[14px] h-[4px] top-[7px] bg-white/14"
              style={{
                transform: 'skewY(14deg)',
                boxShadow: '0 7px 0 rgba(255, 255, 255, 0.14)',
              }}
            />
          </div>
        </div>

        {/* Lights */}
        <div 
          className={`light top absolute w-[3px] h-[8px] left-[83px] top-[4px] rounded-[2px] scale-x-80 origin-[100%_50%] ${
            isAnimating ? 'animate-light' : ''
          }`}
          style={{
            background: '#f0dc5f',
            animation: isAnimating ? 'light 10s ease forwards' : 'none',
          }}
        >
          <div 
            className={`absolute h-[4px] w-[7px] left-[3px] top-1/2 -mt-[2px] bg-gradient-to-r from-[#f0dc5f] via-[rgba(240,220,95,0.7)] to-[rgba(240,220,95,0)] ${
              isAnimating ? 'animate-light-glow' : ''
            }`}
            style={{
              opacity: isAnimating ? 1 : 0,
              transform: 'perspective(2px) rotateY(-15deg) scaleX(0.94)',
              transformOrigin: '0 50%',
              animation: isAnimating ? 'light 10s ease forwards' : 'none',
            }}
          />
        </div>
        <div 
          className={`light bottom absolute w-[3px] h-[8px] left-[83px] bottom-[4px] rounded-[2px] scale-x-80 origin-[100%_50%] ${
            isAnimating ? 'animate-light' : ''
          }`}
          style={{
            background: '#f0dc5f',
            animation: isAnimating ? 'light 10s ease forwards' : 'none',
          }}
        >
          <div 
            className={`absolute h-[4px] w-[7px] left-[3px] top-1/2 -mt-[2px] bg-gradient-to-r from-[#f0dc5f] via-[rgba(240,220,95,0.7)] to-[rgba(240,220,95,0)] ${
              isAnimating ? 'animate-light-glow' : ''
            }`}
            style={{
              opacity: isAnimating ? 1 : 0,
              transform: 'perspective(2px) rotateY(-15deg) scaleX(0.94)',
              transformOrigin: '0 50%',
              animation: isAnimating ? 'light 10s ease forwards' : 'none',
            }}
          />
        </div>
      </div>

      {/* Lines */}
      <div 
        className={`lines absolute h-[3px] bg-white rounded-[2px] w-[6px] top-[30px] left-full ${
          isAnimating ? 'animate-lines' : ''
        }`}
        style={{
          opacity: 0,
          boxShadow: '15px 0 0 white, 30px 0 0 white, 45px 0 0 white, 60px 0 0 white, 75px 0 0 white, 90px 0 0 white, 105px 0 0 white, 120px 0 0 white, 135px 0 0 white, 150px 0 0 white, 165px 0 0 white, 180px 0 0 white, 195px 0 0 white, 210px 0 0 white, 225px 0 0 white, 240px 0 0 white, 255px 0 0 white, 270px 0 0 white, 285px 0 0 white, 300px 0 0 white, 315px 0 0 white, 330px 0 0 white',
          animation: isAnimating ? 'lines 10s ease forwards' : 'none',
        }}
      />

      <style jsx>{`
        @keyframes truck {
          10%, 30% {
            transform: translateX(-164px);
          }
          40% {
            transform: translateX(-104px);
          }
          60% {
            transform: translateX(-224px);
          }
          75%, 100% {
            transform: translateX(24px);
          }
        }

        @keyframes lines {
          0%, 30% {
            opacity: 0;
            transform: scaleY(0.7) translateX(0);
          }
          35%, 65% {
            opacity: 1;
          }
          70% {
            opacity: 0;
          }
          100% {
            transform: scaleY(0.7) translateX(-400px);
          }
        }

        @keyframes light {
          0%, 30% {
            opacity: 0;
            transform: perspective(2px) rotateY(-15deg) scaleX(0.88);
          }
          40%, 100% {
            opacity: 1;
            transform: perspective(2px) rotateY(-15deg) scaleX(0.94);
          }
        }

        @keyframes door1 {
          30%, 50% {
            transform: rotate(32deg);
          }
        }

        @keyframes door2 {
          30%, 50% {
            transform: rotate(-32deg);
          }
        }

        @keyframes box {
          8%, 10% {
            transform: translateX(40px);
            opacity: 1;
          }
          25% {
            transform: translateX(112px);
            opacity: 1;
          }
          26% {
            transform: translateX(112px);
            opacity: 0;
          }
          27%, 100% {
            transform: translateX(0px);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  )
}
