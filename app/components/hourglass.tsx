"use client";

import { animated, useSpring } from "@react-spring/web";

import { useCountdown, useLandingCountdown } from "./countdowns/hooks";

export const Hourglass = ({
  fillAmount,
  ...props
}: { fillAmount: number } & React.ComponentProps<"svg">) => {
  const { topEllipseY, topEllipseRX, topEllipseRY } = useSpring({
    topEllipseY: lerp(312, 740, fillAmount),
    topEllipseRX: lerp(350, 311.99695, fillAmount),
    topEllipseRY: lerpMid(252.12402, 410, 320, fillAmount, 0.9),
  });
  const { bottomEllipseY, bottomEllipseRX, bottomEllipseRY } = useSpring({
    bottomEllipseY: lerp(1200, 730, fillAmount),
    bottomEllipseRX: lerpMid(311.99695, 270, 330, fillAmount, 0.1),
    bottomEllipseRY: lerpMid(320, 480, 300, fillAmount, 0.1),
  });

  return (
    <svg
      xmlSpace="preserve"
      className="-z-50 w-full max-w-2xl overflow-visible px-5 md:px-0"
      xmlns="http://www.w3.org/2000/svg"
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      viewBox="0 0 715.52008 870"
      {...props}
    >
      <defs>
        <clipPath id="sandTopClip" clipPathUnits="userSpaceOnUse">
          <path d="M358.945 402.363c-3.388.09-1.958 22.797-6.59 19.367-2.564-1.897-6.34-27.94-12.289-34.188-10.135-10.644-247.382-263.01-333.42-354.525 227.044-41.855 462.893-46.805 696.825 1.92C577.012 176.462 369.34 384.925 367.307 411.174c-.218 2.786-6.736-8.854-8.362-8.811z" />
        </clipPath>
        <clipPath id="sandBottomClip" clipPathUnits="userSpaceOnUse">
          <path d="M368.74 460.512c-9.078-7.29-13.384-13.733-26.275 4.486-8.728 19.924-121.035 136.728-244.435 265.688 88.94 49.188 433.462 50.15 524.344 3.723-202.189-191.485-231.81-256.374-253.633-273.897z" />
        </clipPath>
        <ellipse
          id="sandTopMotion"
          cx={-33}
          cy={lerpMid(0, 0, 5, fillAmount, 0.9)}
          rx={25}
          ry={lerp(15, 0.00001, fillAmount)}
          fill="none"
          stroke="none"
          display="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <animated.ellipse
          id="sandTop"
          cx={389.29218}
          cy={topEllipseY}
          rx={topEllipseRX}
          ry={topEllipseRY}
          strokeWidth={2.57862}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            rotate="0"
            calcMode="linear"
          >
            <mpath href="#sandTopMotion" />
          </animateMotion>
        </animated.ellipse>
        <animated.ellipse
          id="sandBottom"
          cx={370.29218}
          cy={bottomEllipseY}
          rx={bottomEllipseRX}
          ry={bottomEllipseRY}
          strokeWidth={2.57862}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </defs>

      <g
        clipRule="evenodd"
        fillOpacity={1}
        fillRule="evenodd"
        fill="#ffdfa6"
        strokeWidth="25.3638px"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={1.5}
        strokeOpacity={1}
        className="-z-50"
      >
        {fillAmount < 0.75 && (
          <g className="animate-out fade-out">
            <path
              d="M1862.07 1835.05c-9.15 14.99-13.81 31.01-16.13 48.3-1.59 11.88-2.23 24.01.7 35.75 3.43 13.68 19.12 35.06 35.04 22.24 2.29-1.84 4.17-3.92 5.71-6.41 8.46-13.7 2.42-25.88-5.37-38.04-12.02-18.78-30.75-38.47-19.95-61.84z"
              transform="matrix(.36537 0 0 .36537 -337.674 -209.116) translate(9.821 19.03)"
            />
            <path
              d="M1866.61 1837.15c-4.7 10.17-2.81 19.53 1.39 28.4 4.75 10.01 12.33 19.43 18.23 28.64 8.86 13.83 15.03 27.78 5.41 43.36-1.84 2.99-4.09 5.48-6.82 7.68-10.25 8.25-20.44 5.74-28.6-1.28-7.12-6.13-12.51-15.96-14.43-23.64-3.09-12.35-2.48-25.12-.81-37.63 2.41-17.98 7.3-34.64 16.83-50.24a4.994 4.994 0 016.62-1.8 4.999 4.999 0 012.18 6.51zm-10.91 24.31c-2.24 7.27-3.76 14.78-4.81 22.55-1.51 11.26-2.17 22.76.61 33.87 1.5 6 5.67 13.7 11.24 18.48 4.52 3.89 10.14 5.65 15.81 1.08 1.83-1.47 3.35-3.14 4.58-5.14 7.3-11.82 1.4-22.22-5.32-32.71-6.12-9.56-13.92-19.38-18.84-29.75-1.31-2.76-2.42-5.54-3.27-8.38z"
              transform="matrix(.36537 0 0 .36537 -337.674 -209.116) translate(9.821 19.03)"
            />
          </g>
        )}
        {fillAmount < 0.4 && (
          <g className="animate-out fade-out">
            <path
              d="M1927.4 1880.9c4.59 22.79 2.48 47.78-3.57 69.92-2.98 10.94-5.71 21.59-5.51 33.02.09 4.94.52 10.63 3.46 14.82 3.96 5.63 11.56 5.47 16.98 2.14 8.37-5.16 13.76-15.2 16.29-24.44 8.6-31.4.81-75.49-27.65-95.46z"
              transform="matrix(.36537 0 0 .36537 -337.674 -209.116) translate(-19.829 234.359)"
            />
            <path
              d="M1930.28 1876.81c30.1 21.12 38.69 67.66 29.59 100.87-2.85 10.4-9.08 21.58-18.49 27.37-7.58 4.68-18.15 4.37-23.7-3.52-3.5-4.99-4.26-11.71-4.36-17.6-.2-11.91 2.58-23.02 5.69-34.42 5.85-21.42 7.93-45.58 3.49-67.62-.4-2.01.46-4.05 2.17-5.17a4.993 4.993 0 015.61.09zm4.02 16.95c1.77 19.55-.6 39.92-5.64 58.38-2.86 10.48-5.53 20.67-5.34 31.62.07 3.99.17 8.64 2.55 12.02 2.38 3.39 7.01 2.77 10.27.76 7.32-4.51 11.87-13.41 14.09-21.5 7.01-25.6 2.72-60.23-15.93-81.28z"
              transform="matrix(.36537 0 0 .36537 -337.674 -209.116) translate(-19.829 234.359)"
            />
          </g>
        )}
        {fillAmount < 0.9 && (
          <g className="animate-out fade-out">
            <path
              d="M1917.75 1807.94c-7.95.47-14.04 11.58-12.04 31.92.71 7.22 2.97 18.37 12.61 14.49 1.1-.44 2.28-1.03 3.2-1.79 1.48-1.22 3.04-2.66 4.17-4.25 9.87-13.79 9.28-41.41-7.94-40.37z"
              transform="matrix(.36537 0 0 .36537 -337.674 -209.116) translate(-8.014 -13.505)"
            />
            <path
              d="M1917.45 1802.95c9.46-.57 15.44 4.94 18.13 13.23 3.37 10.37.96 25.56-5.82 35.04-1.38 1.93-3.26 3.71-5.07 5.2-1.3 1.07-2.95 1.95-4.51 2.57-3.89 1.57-7.06 1.4-9.61.41-2.6-1.01-4.69-2.98-6.23-5.63-2.19-3.78-3.18-9.16-3.6-13.42-1.35-13.68.84-23.59 4.52-29.47 3.19-5.12 7.54-7.65 12.19-7.93zm.6 9.98c-2.37.14-4.1 2.26-5.44 5.46-2.03 4.82-2.82 11.87-1.92 20.98.24 2.47.66 5.49 1.65 8 .46 1.17.85 2.36 1.88 2.72.61.21 1.33-.01 2.23-.37.65-.26 1.35-.58 1.89-1.02 1.16-.96 2.4-2.06 3.28-3.3 5.06-7.07 6.97-18.39 4.45-26.13-1.23-3.78-3.71-6.6-8.02-6.34z"
              transform="matrix(.36537 0 0 .36537 -337.674 -209.116) translate(-8.014 -13.505)"
            />
          </g>
        )}
        {fillAmount < 0.7 && (
          <g className="animate-out fade-out">
            <path
              d="M1860.37 2036.99c6.09-4.85 12.57-4.97 19.43-5.56 4.66-.39 9.34.02 13.92.92 2.74.53 5.44 1.32 7.98 2.49 1.97.91 3.83 2.07 5.47 3.48 11.06 9.41 2.15 22.4-2.53 32.74-4.37 9.63-8 20.72-7.12 31.43 1.05 12.83 9.44 22.85 15.85 33.41 4.64 7.68 7.21 15.94-1.37 21.77-7.79 5.29-18.15 2.6-22.72-5.51-2.34-4.15-3.13-9.09-3.79-13.74-1.69-11.94-.22-25.45-4.53-36.86-4.58-12.14-16.87-16.54-24.56-26.1-8.13-10.11-7.12-29.66 3.97-38.47z"
              transform="matrix(.36537 0 0 .36537 -337.674 -209.116) translate(72.797 -149.132)"
            />
            <path
              d="M1857.26 2033.07c6.95-5.53 14.29-5.95 22.12-6.62 5.12-.43 10.27 0 15.3.99 3.13.61 6.21 1.52 9.11 2.86 2.39 1.09 4.63 2.51 6.63 4.21 7.27 6.19 8.12 13.52 6.24 21.04-1.5 6-5.01 12.15-7.47 17.58-4.03 8.88-7.5 19.08-6.69 28.96.99 12.03 9.13 21.3 15.14 31.22 4.13 6.81 6.39 14.11 3.98 20.34-1.13 2.93-3.24 5.73-6.81 8.16-10.24 6.95-23.88 3.47-29.88-7.19-2.64-4.69-3.64-10.24-4.39-15.5-1.64-11.59-.08-24.71-4.26-35.8-1.96-5.2-5.68-8.66-9.62-11.93-4.87-4.02-10.1-7.75-14.16-12.8-4.8-5.97-7.04-14.7-6.3-23.28.74-8.63 4.46-16.99 11.06-22.24zm6.22 7.83c-4.49 3.57-6.81 9.38-7.32 15.26-.51 5.94.82 12.03 4.14 16.17 3.63 4.51 8.38 7.76 12.73 11.36 5.27 4.36 9.99 9.16 12.6 16.1 4.44 11.76 3.07 25.64 4.81 37.93.58 4.05 1.16 8.37 3.2 11.99 3.13 5.55 10.21 7.45 15.55 3.82 5.92-4.02 3.1-9.75-.1-15.04-6.8-11.21-15.44-21.97-16.56-35.59-.94-11.54 2.85-23.53 7.55-33.9 2.23-4.92 5.52-10.44 6.88-15.87.98-3.91.75-7.78-3.03-11-1.3-1.11-2.76-2.03-4.31-2.75-2.19-1-4.51-1.67-6.87-2.13-4.12-.81-8.33-1.19-12.53-.83-5.88.49-11.52.33-16.74 4.48z"
              transform="matrix(.36537 0 0 .36537 -337.674 -209.116) translate(72.797 -149.132)"
            />
          </g>
        )}
        {fillAmount < 0.6 && (
          <g className="animate-in animate-out fade-in fade-out">
            <path
              d="M1938.43 2072.22c-8.27.13-14.39 10.46-14.25 17.91.17 8.96 2.93 18.39 8.43 25.55 6.88 8.95 16.06 15.31 19.7 26.45 1.36 4.19 2.19 9.01 1.72 13.43-.56 5.26-3.5 12.1 1.73 16.01 5.68 4.25 11.87-2.71 14.25-7.27 5.67-10.88 4.83-23.77.69-34.98-3.33-9-9.31-16.39-16.12-22.9-11.66-11.14-13.06-26.17-16.15-34.2z"
              transform="matrix(.36537 0 0 .36537 -337.674 -209.116) rotate(-.81 -2834.931 3063.399)"
            />
            <path
              d="M1943.1 2070.42c2.91 7.58 3.95 21.88 14.93 32.39 7.36 7.03 13.77 15.06 17.36 24.78 4.62 12.51 5.38 26.88-.95 39.02-1.84 3.54-5.57 8.1-9.76 10.07-3.8 1.79-7.92 1.88-11.92-1.11-4.13-3.09-5.27-7.24-5.03-11.76.16-2.95 1.04-6.07 1.33-8.78.4-3.74-.35-7.81-1.51-11.35-1.59-4.89-4.46-8.69-7.63-12.29-3.68-4.19-7.77-8.1-11.27-12.66-6.14-7.99-9.28-18.5-9.47-28.51-.1-5.61 2.56-12.56 7-17.23 3.3-3.48 7.53-5.7 12.17-5.77 2.1-.04 4 1.24 4.75 3.2zm-7.9 7.93c-.64.43-1.23.95-1.77 1.53-2.63 2.77-4.31 6.83-4.25 10.16.15 7.92 2.54 16.27 7.4 22.59 3.37 4.39 7.31 8.13 10.85 12.15 4.05 4.6 7.59 9.55 9.63 15.8 1.58 4.84 2.49 10.4 1.94 15.51-.23 2.15-.84 4.55-1.15 6.92-.23 1.67-.61 3.43.9 4.56.87.64 1.74.11 2.52-.44 1.88-1.31 3.43-3.46 4.31-5.14 5.01-9.62 4.09-21.02.43-30.94-3.06-8.27-8.62-15.03-14.89-21.01-10.44-9.99-13.31-22.83-15.92-31.69z"
              transform="matrix(.36537 0 0 .36537 -337.674 -209.116) rotate(-.81 -2834.931 3063.399)"
            />
          </g>
        )}
      </g>

      <use
        clipPath="url(#sandTopClip)"
        href="#sandTop"
        fill="currentColor"
        className="text-sand"
      />
      <use
        clipPath="url(#sandBottomClip)"
        href="#sandBottom"
        fill="currentColor"
        className="text-sand"
      />
      <g>
        <path
          d="M710.614 735.481a4.46 4.46 0 014.792 4.096 4.46 4.46 0 01-4.095 4.792c-15.088 1.184-25.907-.978-50.417-22.009-23.047-19.776-59.11-56.986-125.325-125.635-79.48-82.404-113.332-118.485-127.813-138.209-10.524-14.328-11.504-20.804-11.711-28.988a4.463 4.463 0 014.347-4.568 4.46 4.46 0 014.568 4.347c.167 6.786 1.255 12.046 9.981 23.931 14.39 19.6 48.067 55.416 127.044 137.296 65.9 68.329 101.774 105.378 124.714 125.06 21.479 18.43 30.693 20.925 43.915 19.887zM634.324 124.942c-8.83-5.034-26.963-15.186-31.417-17.728-.852-.488-1.344-.8-1.415-.852-1.273-.928-1.52-1.928-1.609-2.199-.574-1.716-.103-3.032.62-4.028.575-.79 1.638-1.905 3.752-1.836 33.81 1.1 73.307 10.012 106.586 15.72a4.46 4.46 0 013.64 5.147 4.46 4.46 0 01-5.145 3.64c-26.664-4.573-57.356-11.263-85.828-14.214 8.192 4.61 16.775 9.453 19.42 11.02 1.078.638 1.638 1.133 1.734 1.228 1.412 1.445 1.312 2.877 1.259 3.51a4.343 4.343 0 01-1.273 2.754c-2.45 2.471-71.239 73.662-135.263 143.489-67.088 73.175-98.387 105.947-112.965 124.287-13.55 17.049-11.515 20.693-11.736 35.018a4.462 4.462 0 01-4.525 4.39 4.464 4.464 0 01-4.39-4.525c.257-16.558-1.986-20.73 13.672-40.429 14.632-18.411 46.034-51.318 113.375-124.764 56.008-61.09 115.66-123.217 131.508-139.628z"
          fill="#fff"
          strokeWidth={0.356603}
        />
        <path
          d="M711.41 114.51a4.46 4.46 0 014.096 4.794 4.46 4.46 0 01-4.793 4.095c-13.262-1.041-23.577.419-45.633 18.428-23.45 19.147-59.263 56.154-122.9 126.416-79.672 87.967-113.41 120.385-127.724 137.363-8.501 10.089-9.421 14.011-9.54 22.448a4.46 4.46 0 01-4.52 4.394 4.457 4.457 0 01-4.394-4.518c.146-10.513 1.045-15.502 11.64-28.069 14.335-17.006 48.123-49.489 127.93-137.602 64.118-70.793 100.242-108.045 123.87-127.338 25.022-20.43 36.922-21.591 51.969-20.41zM623.406 750.289c28.471-2.951 59.164-9.641 85.827-14.215a4.46 4.46 0 015.146 3.64 4.46 4.46 0 01-3.64 5.147c-33.279 5.709-72.776 14.621-106.586 15.72-2.635.087-3.702-1.508-4.2-2.61-.186-.407-1.498-3.311 1.436-5.452.072-.053.564-.365 1.416-.852 4.454-2.542 22.587-12.695 31.417-17.729-15.848-16.41-75.5-78.538-131.508-139.627-67.352-73.457-98.44-106.528-112.904-124.922-15.427-19.613-13.163-23.564-14.033-39.308a4.462 4.462 0 014.205-4.7 4.46 4.46 0 014.696 4.204c.76 13.726-1.305 17.199 12.139 34.295 14.407 18.318 45.385 51.243 112.465 124.408 64.025 69.826 132.814 141.017 135.263 143.488a4.347 4.347 0 011.274 2.754c.052.634.153 2.066-1.26 3.51-.095.096-.655.59-1.732 1.229-2.646 1.567-11.23 6.41-19.42 11.02zM4.211 744.341a4.46 4.46 0 01-4.095-4.793 4.46 4.46 0 014.793-4.095c13.221 1.038 22.436-1.458 43.914-19.887 22.94-19.683 58.814-56.731 124.715-125.06 78.977-81.88 112.654-117.697 127.043-137.296 8.726-11.885 9.814-17.145 9.981-23.932a4.46 4.46 0 014.569-4.347 4.463 4.463 0 014.347 4.568c-.207 8.185-1.188 14.66-11.711 28.989-14.482 19.724-48.334 55.805-127.814 138.208-66.214 68.65-102.277 105.86-125.325 125.636-24.51 21.03-35.329 23.193-50.417 22.01zM81.196 124.914c15.848 16.41 75.5 78.538 131.508 139.627 67.341 73.446 98.744 106.354 113.375 124.765 15.659 19.699 13.416 23.871 13.672 40.428a4.464 4.464 0 01-4.39 4.525 4.462 4.462 0 01-4.525-4.39c-.22-14.324 1.816-17.969-11.735-35.018-14.578-18.34-45.877-51.112-112.965-124.287C142.11 200.738 73.323 129.547 70.873 127.076a4.347 4.347 0 01-1.273-2.754c-.055-.634-.154-2.066 1.258-3.51.096-.096.657-.59 1.733-1.229 2.647-1.567 11.23-6.41 19.421-11.02-28.471 2.951-59.164 9.641-85.827 14.215a4.46 4.46 0 01-5.146-3.64 4.46 4.46 0 013.641-5.148c33.278-5.708 72.776-14.62 106.585-15.72 2.635-.086 3.702 1.51 4.201 2.611.185.407 1.498 3.311-1.437 5.452-.071.053-.564.365-1.416.852-4.454 2.542-22.587 12.695-31.417 17.729z"
          fill="#fff"
          strokeWidth={0.356603}
        />
        <path
          d="M4.807 123.37a4.46 4.46 0 01-4.793-4.095 4.46 4.46 0 014.095-4.793c15.047-1.18 26.947-.02 51.969 20.41 23.628 19.293 59.752 56.546 123.87 127.338 79.807 88.114 113.595 120.596 127.93 137.603 10.595 12.567 11.494 17.555 11.64 28.068a4.457 4.457 0 01-4.393 4.518 4.46 4.46 0 01-4.522-4.393c-.118-8.437-1.038-12.36-9.54-22.448C286.75 388.6 253.013 356.18 173.34 268.214c-63.635-70.261-99.45-107.268-122.9-126.416C28.386 123.79 18.07 122.33 4.808 123.37zM92.115 750.26c-8.19-4.61-16.774-9.452-19.42-11.02-1.077-.638-1.637-1.133-1.733-1.228-1.412-1.444-1.313-2.877-1.259-3.51a4.344 4.344 0 011.273-2.754c2.45-2.47 71.239-73.662 135.263-143.489 67.08-73.164 98.059-106.089 112.466-124.408 13.443-17.095 11.379-20.569 12.138-34.294a4.46 4.46 0 014.697-4.204 4.461 4.461 0 014.204 4.7c-.87 15.744 1.394 19.695-14.032 39.308-14.464 18.394-45.553 51.465-112.904 124.922C156.8 655.373 97.147 717.5 81.3 733.91c8.83 5.034 26.962 15.187 31.416 17.729.853.487 1.345.799 1.416.852 1.273.927 1.52 1.927 1.608 2.198.575 1.716.103 3.032-.62 4.028-.574.79-1.637 1.905-3.752 1.836-33.81-1.099-73.306-10.012-106.585-15.72a4.46 4.46 0 01-3.64-5.147 4.46 4.46 0 015.145-3.64c26.663 4.574 57.356 11.263 85.827 14.214z"
          fill="#fff"
          strokeWidth={0.356603}
        />
      </g>
    </svg>
  );
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpMid(a: number, mid: number, b: number, t: number, tMid: number) {
  return t <= tMid
    ? lerp(a, mid, t / tMid)
    : lerp(mid, b, (t - tMid) / (1 - tMid));
}

const CountdownHourglass = ({ from, to }: { from: Date; to: Date }) => {
  const fillAmount = useFillAmount(from, to);
  return <Hourglass fillAmount={fillAmount} />;
};

export const FeatureCountdownHourglass = (props: { from: Date; to: Date }) => {
  const landingCountdown = useLandingCountdown();
  return landingCountdown ? (
    <CountdownHourglass {...landingCountdown} />
  ) : (
    <CountdownHourglass {...props} />
  );
};

function useFillAmount(startDate: Date, endDate: Date) {
  const { diff: remaining } = useCountdown(endDate);
  const total = endDate.getTime() - startDate.getTime();
  const passed = total - remaining;
  const fillAmount = passed / total;
  return Math.max(0, Math.min(1, fillAmount));
}
