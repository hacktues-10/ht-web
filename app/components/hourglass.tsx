"use client";

import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

const Hourglass = ({
  fillAmount,
  ...props
}: { fillAmount: number } & React.ComponentProps<"svg">) => {
  const { ellipseY, ellipseRX, ellipseRY } = useSpring({
    ellipseY: lerp(312, 740, fillAmount),
    ellipseRX: lerp(350, 311.99695, fillAmount),
    ellipseRY: lerp(252.12402, 320, fillAmount),
  });

  return (
    <svg
      xmlSpace="preserve"
      className="w-full max-w-2xl"
      xmlns="http://www.w3.org/2000/svg"
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      viewBox="0 0 715.52008 760.58466"
      {...props}
    >
      <g fill="#ffdfa6" strokeWidth={0.356603}>
        <path d="M365.81 459.07c-2.836.167-5.008 4.13-4.294 11.383.253 2.574 1.059 6.55 4.496 5.167.393-.158.814-.367 1.142-.639.527-.435 1.084-.948 1.487-1.515 3.52-4.918 3.309-14.767-2.832-14.396z" />
        <path d="M365.702 457.29c3.374-.203 5.506 1.762 6.465 4.718 1.202 3.698.343 9.115-2.075 12.496-.492.688-1.163 1.323-1.808 1.854-.464.381-1.052.695-1.608.916-1.388.56-2.518.5-3.427.146-.927-.36-1.673-1.062-2.222-2.007-.78-1.348-1.134-3.267-1.284-4.786-.481-4.878.3-8.412 1.612-10.509 1.138-1.826 2.689-2.728 4.347-2.828zm.214 3.56c-.845.05-1.462.805-1.94 1.946-.724 1.72-1.005 4.233-.684 7.482.086.88.235 1.958.588 2.853.165.417.303.841.67.97.218.075.475 0 .796-.132.231-.093.48-.206.674-.363.413-.343.855-.735 1.17-1.177 1.804-2.521 2.485-6.558 1.586-9.318-.438-1.348-1.323-2.354-2.86-2.261z" />
      </g>
      <g fill="#ffdfa6" strokeWidth={0.356603}>
        <path d="M345.953 468.737c-3.262 5.346-4.924 11.059-5.752 17.224-.567 4.237-.795 8.562.25 12.749 1.223 4.878 6.818 12.502 12.495 7.93a8.892 8.892 0 002.037-2.285c3.017-4.886.863-9.23-1.915-13.565-4.287-6.697-10.966-13.719-7.115-22.053z" />
        <path d="M347.572 469.486c-1.676 3.627-1.002 6.965.496 10.128 1.694 3.57 4.397 6.929 6.501 10.213 3.16 4.932 5.36 9.906 1.93 15.462a10.616 10.616 0 01-2.433 2.739c-3.655 2.942-7.289 2.047-10.199-.457-2.539-2.186-4.46-5.691-5.145-8.43-1.102-4.404-.885-8.958-.29-13.419.86-6.411 2.604-12.352 6.002-17.915a1.78 1.78 0 012.361-.642 1.783 1.783 0 01.777 2.321zm-3.89 8.67c-.799 2.592-1.34 5.27-1.715 8.04-.539 4.016-.774 8.117.217 12.079.535 2.14 2.022 4.885 4.008 6.59 1.612 1.387 3.616 2.015 5.638.385a7.09 7.09 0 001.634-1.833c2.603-4.215.499-7.924-1.898-11.665-2.182-3.409-4.964-6.91-6.718-10.608a21.054 21.054 0 01-1.166-2.989z" />
      </g>
      <g fill="#ffdfa6" strokeWidth={0.356603}>
        <path d="M369.25 485.088c1.637 8.127.885 17.038-1.273 24.933-1.062 3.901-2.036 7.7-1.965 11.775.032 1.762.186 3.791 1.234 5.285 1.412 2.008 4.123 1.95 6.055.763 2.985-1.84 4.907-5.42 5.81-8.715 3.066-11.197.288-26.92-9.86-34.041z" />
        <path d="M370.277 483.63c10.734 7.53 13.797 24.127 10.552 35.97-1.016 3.708-3.238 7.695-6.593 9.76-2.703 1.669-6.473 1.558-8.452-1.255-1.248-1.78-1.519-4.176-1.554-6.277-.072-4.247.92-8.209 2.028-12.274 2.087-7.638 2.828-16.254 1.245-24.113a1.787 1.787 0 01.774-1.844 1.78 1.78 0 012 .032zm1.434 6.043c.631 6.972-.214 14.236-2.011 20.82-1.02 3.736-1.972 7.37-1.904 11.275.024 1.423.06 3.08.909 4.286.849 1.21 2.5.988 3.662.271 2.61-1.608 4.233-4.782 5.025-7.667 2.5-9.129.97-21.478-5.681-28.985z" />
      </g>
      <g fill="#ffdfa6" strokeWidth={0.356603}>
        <path
          d="M345.347 540.75c2.172-1.73 4.483-1.773 6.93-1.983 1.66-.139 3.33 0 4.963.328.977.19 1.94.47 2.846.888a8.375 8.375 0 011.95 1.241c3.944 3.356.767 7.988-.902 11.675-1.558 3.434-2.853 7.389-2.539 11.208.375 4.576 3.366 8.149 5.652 11.914 1.655 2.74 2.571 5.685-.488 7.764-2.778 1.886-6.473.927-8.102-1.965-.835-1.48-1.116-3.242-1.352-4.9-.603-4.258-.078-9.076-1.615-13.144-1.633-4.33-6.016-5.899-8.758-9.308-2.9-3.605-2.54-10.576 1.415-13.718z"
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={1.5}
        />
        <path d="M344.238 539.352c2.479-1.972 5.096-2.122 7.888-2.36 1.826-.154 3.663 0 5.456.352 1.116.218 2.215.542 3.249 1.02.852.389 1.651.895 2.364 1.501 2.593 2.208 2.896 4.822 2.226 7.503-.535 2.14-1.787 4.333-2.664 6.27-1.437 3.166-2.675 6.803-2.386 10.327.353 4.29 3.256 7.595 5.399 11.133 1.473 2.428 2.279 5.032 1.42 7.253-.404 1.045-1.156 2.043-2.43 2.91-3.65 2.478-8.515 1.237-10.655-2.564-.941-1.672-1.298-3.652-1.565-5.527-.585-4.133-.028-8.812-1.52-12.767-.698-1.854-2.025-3.088-3.43-4.254-1.736-1.433-3.601-2.764-5.05-4.564-1.71-2.13-2.51-5.243-2.246-8.302.264-3.078 1.59-6.059 3.944-7.931zm2.218 2.792c-1.6 1.273-2.428 3.345-2.61 5.442-.182 2.118.292 4.29 1.476 5.766 1.295 1.608 2.989 2.767 4.54 4.051 1.88 1.555 3.562 3.267 4.493 5.742 1.583 4.193 1.095 9.143 1.715 13.525.207 1.445.414 2.985 1.142 4.276 1.116 1.98 3.64 2.657 5.545 1.362 2.11-1.433 1.105-3.477-.036-5.363-2.425-3.998-5.506-7.835-5.905-12.691-.336-4.116 1.016-8.391 2.692-12.09.795-1.754 1.968-3.722 2.454-5.659.349-1.394.267-2.774-1.081-3.922a6.75 6.75 0 00-1.537-.981 10.908 10.908 0 00-2.45-.76c-1.47-.288-2.97-.424-4.468-.295-2.097.174-4.108.118-5.97 1.597z" />
      </g>
      <g fill="#ffdfa6" strokeWidth={0.356603}>
        <path d="M373.184 553.313c-2.95.047-5.132 3.73-5.082 6.387.06 3.195 1.045 6.558 3.006 9.11 2.454 3.193 5.727 5.46 7.025 9.433.485 1.494.781 3.213.614 4.79-.2 1.875-1.248 4.314.617 5.708 2.025 1.516 4.233-.966 5.081-2.592 2.022-3.88 1.723-8.477.246-12.474-1.187-3.21-3.32-5.845-5.748-8.166-4.158-3.973-4.657-9.333-5.76-12.196z" />
        <path d="M374.85 552.671c1.037 2.703 1.408 7.802 5.323 11.55 2.625 2.507 4.91 5.37 6.19 8.837 1.648 4.461 1.92 9.586-.338 13.915-.656 1.262-1.986 2.888-3.48 3.59-1.356.639-2.825.671-4.251-.395-1.473-1.102-1.88-2.582-1.794-4.194.056-1.052.37-2.164.474-3.13.143-1.335-.125-2.786-.538-4.048-.567-1.744-1.59-3.1-2.721-4.383-1.312-1.494-2.77-2.888-4.019-4.515-2.19-2.849-3.31-6.597-3.377-10.166-.035-2 .913-4.48 2.496-6.145 1.177-1.24 2.686-2.032 4.34-2.057a1.771 1.771 0 011.694 1.141zm-2.818 2.828a3.664 3.664 0 00-.631.545c-.938.988-1.537 2.436-1.516 3.623.053 2.825.906 5.802 2.639 8.056 1.202 1.566 2.607 2.9 3.87 4.333 1.443 1.64 2.706 3.406 3.433 5.634.564 1.726.888 3.709.692 5.531-.082.767-.3 1.623-.41 2.468-.083.595-.218 1.223.32 1.626.311.228.621.04.9-.157.67-.468 1.223-1.234 1.537-1.833 1.786-3.43 1.458-7.496.153-11.034-1.091-2.949-3.074-5.36-5.31-7.492-3.723-3.562-4.746-8.141-5.677-11.3z" />
      </g>
      <clipPath id="sandTopClip" clipPathUnits="userSpaceOnUse">
        <path d="M358.945 402.363c-3.388.09-1.958 22.797-6.59 19.367-2.564-1.897-6.34-27.94-12.289-34.188-10.135-10.644-247.382-263.01-333.42-354.525 227.044-41.855 462.893-46.805 696.825 1.92C577.012 176.462 369.34 384.925 367.307 411.174c-.218 2.786-6.736-8.854-8.362-8.811z" />
      </clipPath>
      <animated.ellipse
        cx={389.29218}
        cy={ellipseY}
        rx={ellipseRX}
        ry={ellipseRY}
        fill="#ffdfa6"
        strokeWidth={2.57862}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#sandTopClip)"
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

export const Test = () => {
  const [fillAmount, setFillAmount] = useState(0.5);
  return (
    <>
      <Hourglass fillAmount={fillAmount} />
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={fillAmount}
        onChange={(e) => setFillAmount(parseFloat(e.target.value))}
      />
    </>
  );
};
