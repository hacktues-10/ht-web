import Image, { ImageProps } from "next/image";

import { PageBackdrop } from "~/app/(full-layout)/page";
import ht3line1 from "./HackTUES3_line1.png";
import ht3line2 from "./HackTUES3_line2.png";
import ht3line3 from "./HackTUES3_line3.png";
import leaves from "./leaves.webp";
import smartcity from "./smartcity.png";

export const HT1Background = () => (
  <>
    <HT1Book className="absolute -left-3 bottom-24 -z-20 h-32 opacity-80 sm:left-16" />
    <HT1Line1 className="absolute -right-3 top-0 -z-20 h-44 translate-x-[50px] opacity-80 sm:right-9 sm:translate-x-0" />
    <HT1Line2 className="absolute -right-48 top-1/2 -z-20 h-10 opacity-80 sm:h-20" />
    <HT1Line3 className="absolute -right-8 bottom-0 -z-20 h-20 opacity-80 lg:h-28" />
  </>
);

export const HT2Background = () => (
  <>
    <HT2Bulb className="absolute bottom-20 left-2 -z-20 h-28 translate-x-20 opacity-80 sm:left-16" />
    <HT2Interlinked className="top-15 absolute -right-36 -z-20 h-28 opacity-80" />
    <HT2Recycle className="absolute right-2 top-5 -z-20 h-28 opacity-80 sm:right-16" />
    <HT2Line1 className="absolute -right-1/4 top-0 -z-20 h-72 translate-x-52 opacity-80 sm:right-9" />
    <HT2Line2 className="absolute -left-2 bottom-0 -z-20 h-60 opacity-80" />
    <HT2Line3 className="absolute -right-48 bottom-6 -z-20 h-10 opacity-80" />
  </>
);

export const HT3Background = () => (
  <>
    <HT3Line1 className="absolute left-0 top-1/3 -z-20 -translate-x-[320px] opacity-70" />
    <HT3Line2 className="absolute right-0 top-0 -z-20 translate-x-[240px] translate-y-10 scale-75 sm:translate-x-[400px] sm:scale-[60%] md:-translate-y-60" />
    <HT3Line3 className="absolute -bottom-12 left-0 -z-20 -translate-y-[48px] scale-75 sm:-left-60 sm:-translate-y-[28px]" />
  </>
);

export const HT4Background = () => (
  <>
    <HT4Layout1 className="absolute -left-10 bottom-0 -z-20 h-[350px] opacity-80" />
    <HT4Layout2 className="absolute -right-10 bottom-0 -z-20 h-[95%] opacity-80" />
  </>
);

export const HT5Background = () => (
  <>
    <HT5Wifi className="absolute right-16 top-4 -z-20 h-28 opacity-80" />
    <HT5Bug className="absolute -right-7 top-36 -z-20 h-28 opacity-80" />
    <HT5Robot className="absolute bottom-0 left-[10%] -z-20 h-28 opacity-80" />
    <HT5Cogwheel className="absolute -right-14 bottom-48 -z-20 h-28 opacity-80" />
    <HT5Laptop className="absolute bottom-20 right-0 -z-20 h-28 opacity-80" />
    <HT5Logs className="absolute bottom-8 right-44 -z-20 h-28 opacity-80" />
    <HT5Lang className="absolute bottom-2 right-[80px] -z-20 h-28 scale-90 opacity-80" />
  </>
);

export const HT6Background = () => (
  <>
    <HT6Sun className="absolute bottom-0 left-1/2 -z-20 h-28 -translate-x-1/2" />
    <Image
      src={smartcity}
      alt="Smart City"
      className="absolute bottom-0 left-1/2 -z-20 -translate-x-1/2"
    />
  </>
);

export const HT7Background = () => (
  <>
    <HT7Wireframe className="-z-2 absolute inset-0 [mask-image:linear-gradient(to_right,transparent,10%,white,90%,transparent)]" />
    <div className="inset-0">
      <PageBackdrop className="h-full">
        <Image
          src={leaves}
          alt="Листа"
          // className="absolute bottom-0 left-1/2 -z-20 -translate-x-1/2 sm:max-h-80 sm:w-auto"
          className="absolute bottom-0 left-1/2 -z-20 -translate-x-1/2 sm:max-h-80 sm:w-auto"
        />
      </PageBackdrop>
    </div>
  </>
);

export const HT8Background = () => (
  <>
    <HT8Curve className="absolute inset-y-0 right-0 -z-20 h-full translate-x-32" />
    <HT8Stars className="absolute bottom-12 right-0 -z-20 h-96" />
    <HT8Lines1 className="absolute bottom-24 left-0 -z-20 h-32" />
    <HT8Lines2 className="absolute right-12 top-10 -z-20 h-64" />
    <HT8SmallPlanet className="absolute bottom-0 left-0 -z-20 h-36" />
    <HT8BigPlanet className="absolute right-0 top-0 -z-20 h-60" />
  </>
);

function HT1Book(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 518 500"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      {...props}
    >
      <g
        transform="translate(-375.679 -1595.98) matrix(2.30234 1.78352 -1.78348 2.30239 -2361.66 -5476.41)"
        fill="none"
        stroke="#fff"
        strokeWidth="6px"
      >
        <path d="M2347.05 1406.63H2359.4030000000002V1412.3120000000001H2347.05z" />
        <path d="M2292.2 1396.28s20.04.89 28.45 2.08c9.9 1.39 30.95 6.3 30.95 6.3s25.1-4.79 35.44-6.21c8.91-1.22 26.65-2.29 26.65-2.29" />
        <path d="M2293.76 1308.28h-10.87v99.03h141.04v-98.26h-10.52" />
        <path d="M2352.7 1403.05s19.74-8.7 29.33-11.63c13.27-4.04 30.46-5.41 30.46-5.41v-87.15s-18.86.02-33.43 7.5c-13.49 6.93-25.48 18.81-25.48 18.81s-12.44-12.33-27.02-19c-15.03-6.88-33.22-7.12-33.22-7.12v87.17s15.96.71 26.25 3.4c16.28 4.26 33.11 13.43 33.11 13.43zM2353.58 1325.17l-.86 75.56" />
      </g>
    </svg>
  );
}

function HT1Line1(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 679 506"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M1023.14-46.148c-5.69-1.108-9.41-6.626-8.3-12.314 1.11-5.688 6.63-9.406 12.31-8.298 37.1 7.226 70.16 23.761 99.87 47.096 70.17 55.132 80.2 133.378 93.03 206.075 11.75 66.63 25.88 128.453 103.43 157.295 41.61 15.47 88.95 14.324 131.15 1.587 5.55-1.675 11.41 1.469 13.08 7.017 1.68 5.548-1.46 11.412-7.01 13.086-46.51 14.039-98.69 15.042-144.54-2.008-86.1-32.02-103.75-99.355-116.8-173.33-11.97-67.909-19.76-141.707-85.32-193.208-27.05-21.254-57.11-36.416-90.9-42.998z"
        fill="#fff"
        transform="translate(-2592.18 115.307) matrix(1.28587 -.18626 .18626 1.2859 1298.13 161.877)"
      />
      <path
        d="M1230.59 267.266c-2.12-5.393.54-11.493 5.93-13.615 5.39-2.121 11.49.536 13.61 5.928 13.9 35.33 26.51 66.708 73.35 84.127 41.61 15.47 88.95 14.324 131.15 1.587 5.55-1.675 11.41 1.469 13.08 7.017 1.68 5.548-1.46 11.412-7.01 13.086-46.51 14.039-98.69 15.042-144.54-2.008-54.01-20.084-69.54-55.385-85.57-96.122z"
        fill="#fff"
        transform="translate(-2592.18 115.307) matrix(1.28587 -.18626 .18626 1.2859 1298.13 161.877) rotate(-3.802 884.124 36.67)"
      />
    </svg>
  );
}

function HT1Line2(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 919 184"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      {...props}
    >
      <path
        d="M3034.99 591.218h-436.1 146.12l-46.34 46.335h-350.35 191.4v75.088"
        fill="none"
        stroke="#fff"
        strokeWidth="20px"
        transform="translate(-2988.17 -729.68) matrix(1.29929 0 0 1.29932 -49.984 -25.507)"
      />
    </svg>
  );
}

function HT1Line3(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 1608 345"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      {...props}
    >
      <g fill="none" stroke="#fff" strokeWidth="20px">
        <path
          d="M3051.63 1677.46H1835.7M3052.67 1755.11h-554.19 189.16l-53.58 53.57v114.02"
          transform="translate(-2322.77 -1865.49) matrix(1.29929 0 0 1.29932 -49.34 -301.064)"
        />
      </g>
    </svg>
  );
}

function HT2Line1(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 777 1064"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      {...props}
    >
      <path
        d="M506.498-71.722c33.552 175.013 126.153 275.899 259.815 347.891 144.816 78 229.908 192.984 256.877 343.96"
        fill="none"
        stroke="#fff"
        strokeWidth="17px"
        transform="translate(-3156.14 407.385) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(255.099 -100.358) matrix(-1 0 0 1 3336.45 -87.96)"
      />
      <path
        d="M867.989 225.971C968.311 385.729 953.684 477.167 976.875 596.5"
        fill="none"
        stroke="#fff"
        strokeWidth="17px"
        transform="translate(-3156.14 407.385) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(255.099 -100.358) scale(-1 1) rotate(-6.426 -355.193 29316.194)"
      />
    </svg>
  );
}

function HT2Line2(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 463 786"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      {...props}
    >
      <path
        d="M1874.69-59.099v316.072-155.971l70.79 70.789h270.3-120.64l55.31 55.314v290.943"
        fill="none"
        stroke="#fff"
        strokeWidth="17px"
        transform="translate(-448.056 -1493) matrix(1.29207 0 0 1.32214 -64.128 -52.463) matrix(1 0 0 -1 -1469.68 1695.36)"
      />
    </svg>
  );
}

function HT2Line3(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 1902 99"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      {...props}
    >
      <path
        d="M3083.8 1657.78h-986.6 658.74l-57.79 57.79H1629"
        fill="none"
        stroke="#fff"
        strokeWidth="17px"
        transform="translate(-2029.55 -1934.7) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(0 -146.386)"
      />
    </svg>
  );
}

function HT2Bulb(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 267 340"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      {...props}
    >
      <path
        d="M2170.07 792.969c.53 11.294 1.28 24.133 8.08 27.698 15.73 8.24 31.31-1.071 31.79-4.588.98-7.164-10.3-10.879-17.84-10.133-6.15.607-10.93 1.751-10.09 4.695.71 2.49 6.87 2.697 10.47 2.535 7.12-.32 20.24-3.422 19.99-9.691-.27-6.643-11-10.836-20.56-10.257-9.28.564-13.97 2.207-13.71 5.093.27 2.946 9.4 3.725 13.89 3.16 7.4-.934 22.67-5.054 21.53-10.532-1.36-6.551-30.17-1.366-42.44-8.757-14.23-8.567-11.62-31.023-15.23-39.463-5.38-12.609-17.59-32.159-19.13-50.345-2.75-32.408 15.48-59.472 47.5-60.714 49.68-1.928 60.1 38.58 60.33 57.106.23 19.29-15.36 32.127-20.94 54.085-3.37 13.229.35 27.046-6.67 33.03-10.6 9.024-27.11 6.182-28.99-3.407-6.7-34.227 9.01-68.931 17.32-81.421 1.86-2.802 6.19-7.011 9.1-4.631 2.55 2.083-1.3 6.46-3.71 8.309-3.12 2.402-9.16 8.226-15.03 6.103-7.35-2.663-8.4-8.894-8.85-12.104-.85-6.051 2.63-6.791 3.69-6.65 2.76.369 4.63 4.422 2.69 9.168-1.28 3.154-3.87 9.112-10.3 10.167-6.88 1.129-11.9-3.896-14.6-6.935-3.54-3.98-4.03-6.905-2.64-8.683 2.21-2.845 7.36 1.911 8.68 4.178 3.84 6.587 7.97 18.242 9.19 28.689"
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-493.233 -1266.53) matrix(1.29207 0 0 1.32214 -64.128 -52.463) scale(1.43154) rotate(33.992 1177.525 -2225.402)"
      />
    </svg>
  );
}

function HT2Interlinked(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 507 454"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      {...props}
    >
      <path
        d="M2300.83 1167.8v14.11c0 3.89-3.09 7.05-6.9 7.05h-14.64c-3.8 0-6.89-3.16-6.89-7.05v-14.11c0-3.9 3.09-7.06 6.89-7.06h14.64c3.81 0 6.9 3.16 6.9 7.06z"
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) matrix(1.79589 1.00488 -.9706 1.73462 -1905.92 -4222.24)"
      />
      <path
        d="M2300.83 1167.8v14.11c0 3.89-3.09 7.05-6.9 7.05h-14.64c-3.8 0-6.89-3.16-6.89-7.05v-14.11c0-3.9 3.09-7.06 6.89-7.06h14.64c3.81 0 6.9 3.16 6.9 7.06z"
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) matrix(1.79589 1.00488 -.9706 1.73462 -1980.2 -4089.65)"
      />
      <path
        d="M2300.83 1167.8v14.11c0 3.89-3.09 7.05-6.9 7.05h-14.64c-3.8 0-6.89-3.16-6.89-7.05v-14.11c0-3.9 3.09-7.06 6.89-7.06h14.64c3.81 0 6.9 3.16 6.9 7.06z"
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) matrix(1.79589 1.00488 -.9706 1.73462 -1738.32 -3953.98)"
      />
      <path
        d="M2300.83 1167.8v14.11c0 3.89-3.09 7.05-6.9 7.05h-14.64c-3.8 0-6.89-3.16-6.89-7.05v-14.11c0-3.9 3.09-7.06 6.89-7.06h14.64c3.81 0 6.9 3.16 6.9 7.06z"
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) matrix(1.79589 1.00488 -.9706 1.73462 -1664.1 -4086.8)"
      />
      <path
        d="M2300.21 1187.38l22.27 21.88M2322.77 1219.49l-22.92 22.01M2395.61 1219.04l22.26 21.56"
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) rotate(29.229 6780.39 -5144.042) scale(1.90521)"
      />
      <circle
        cx={2359.02}
        cy={1216.47}
        r={36.478}
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) rotate(29.229 6790.909 -5141.951) scale(1.90521)"
      />
      <circle
        cx={2359.02}
        cy={1216.47}
        r={36.478}
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) scale(1.6472) rotate(29.229 3572.59 -2508.356)"
      />
      <path
        d="M2338.68 1235.93s8.59-11.24 20.12-11.35c13.52-.13 20.44 11.37 20.44 11.37M2359.32 1188.06s6.8-.09 12.14 3.12c5.65 3.4 9.01 8.8 9.01 8.8M2383.77 1205.34c.91 2.23 1.37 4.35 1.13 8.45"
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) rotate(29.229 6780.39 -5144.042) scale(1.90521)"
      />
      <circle
        cx={2359.42}
        cy={1208.78}
        r={11.055}
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) rotate(29.229 6783.632 -5144.334) scale(1.90521)"
      />
      <path
        d="M2338.68 1235.93s8.59-11.24 20.12-11.35c13.52-.13 20.44 11.37 20.44 11.37"
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) rotate(29.229 3948.753 -1977.382) scale(1.03828)"
      />
      <circle
        cx={2359.42}
        cy={1208.78}
        r={11.055}
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) rotate(29.229 3950.515 -1977.535) scale(1.03828)"
      />
      <path
        d="M2338.68 1235.93s8.59-11.24 20.12-11.35c13.52-.13 20.44 11.37 20.44 11.37"
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) rotate(29.229 3811.653 -1446.02) scale(1.03828)"
      />
      <circle
        cx={2359.42}
        cy={1208.78}
        r={11.055}
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) rotate(29.229 3813.415 -1446.173) scale(1.03828)"
      />
      <path
        d="M2338.68 1235.93s8.59-11.24 20.12-11.35c13.52-.13 20.44 11.37 20.44 11.37"
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) rotate(29.229 3658.219 -2053.47) scale(1.03828)"
      />
      <circle
        cx={2359.42}
        cy={1208.78}
        r={11.055}
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) rotate(29.229 3659.981 -2053.622) scale(1.03828)"
      />
      <path
        d="M2338.68 1235.93s8.59-11.24 20.12-11.35c13.52-.13 20.44 11.37 20.44 11.37"
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) rotate(29.229 3519.776 -1521.762) scale(1.03828)"
      />
      <circle
        cx={2359.42}
        cy={1208.78}
        r={11.055}
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) rotate(29.229 3521.557 -1521.92) scale(1.03828)"
      />
      <path
        d="M2396.22 1209l21.95-21.79"
        fill="none"
        stroke="#fff"
        strokeWidth="3.5px"
        transform="translate(-2982.83 -1354.95) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(1409.94 988.238) rotate(29.229 6780.39 -5144.042) scale(1.90521)"
      />
    </svg>
  );
}

function HT2Recycle(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 327 394"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      {...props}
    >
      <path
        d="M2513.47 467.102l22.71 26.802s-43.15 38.65-33.02 81.19c13.52 56.718 79.5 72.634 79.5 72.634l3.82-38.604s21.49 28.27 31.64 38.94c9.81 10.305 32.3 28.347 32.3 28.347s-31.85 8.499-46.94 13.692c-14.61 5.032-43.57 17.467-43.57 17.467l8.73-34.759s-82.52-11.533-97.72-78.867c-20.27-89.803 42.55-126.842 42.55-126.842z"
        fill="none"
        stroke="#fff"
        strokeWidth="6.5px"
        transform="translate(-3359.85 -514.063) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(-1.237 -341.817) translate(187.623 356.872)"
      />
      <path
        d="M2513.47 467.102l22.71 26.802s-43.15 38.65-33.02 81.19c13.52 56.718 79.5 72.634 79.5 72.634l3.82-38.604s21.49 28.27 31.64 38.94c9.81 10.305 32.3 28.347 32.3 28.347s-31.85 8.499-46.94 13.692c-14.61 5.032-43.57 17.467-43.57 17.467l8.73-34.759s-82.52-11.533-97.72-78.867c-20.27-89.803 42.55-126.842 42.55-126.842z"
        fill="none"
        stroke="#fff"
        strokeWidth="6.5px"
        transform="translate(-3359.85 -514.063) matrix(1.29207 0 0 1.32214 -64.128 -52.463) translate(-1.237 -341.817) rotate(-179.469 2684.638 739.963)"
      />
    </svg>
  );
}

function HT3Line1(props: Omit<ImageProps, "src" | "alt">) {
  return <Image src={ht3line1} alt="" {...props} />;
}

function HT3Line2(props: Omit<ImageProps, "src" | "alt">) {
  return <Image src={ht3line2} alt="" {...props} />;
}

function HT3Line3(props: Omit<ImageProps, "src" | "alt">) {
  return <Image src={ht3line3} alt="" {...props} />;
}

function HT4Layout1(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 243 1045"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      {...props}
    >
      <circle
        cx={525.548}
        cy={1693.74}
        r={0.96}
        fill="#5afbee"
        stroke="#75fbee"
        strokeWidth=".63px"
        transform="translate(-388.957 -1415.88) translate(-1554.33 -4616.94) scale(3.36992) translate(-553.649 -2081.72) scale(2.38865) translate(-362.351 -1043.24) scale(1.59373)"
      />
      <path
        d="M518.327 1812.12v-80.32l-7.381-7.38v-38.03"
        fill="none"
        stroke="#75fbee"
        strokeWidth="1px"
        transform="translate(-388.957 -1415.88) translate(-1554.33 -4616.94) scale(3.36992) translate(-553.649 -2081.72) scale(2.38865) translate(-28.273 -61.895)"
      />
      <path
        d="M518.327 1752.55l-5.728-5.73v-11.44 9.7l-4.262-4.26v-2.84l-4.823-4.82 3.092-3.09v-5.89M503.514 1733.16v-16.13"
        fill="none"
        stroke="#75fbee"
        strokeWidth="1px"
        transform="translate(-388.957 -1415.88) translate(-1554.33 -4616.94) scale(3.36992) translate(-553.649 -2081.72) scale(2.38865) translate(-28.273 -61.895)"
      />
      <circle
        cx={525.548}
        cy={1693.74}
        r={0.96}
        fill="#5afbee"
        stroke="#75fbee"
        strokeWidth=".63px"
        transform="translate(-388.957 -1415.88) translate(-1554.33 -4616.94) scale(3.36992) translate(-553.649 -2081.72) scale(2.38865) translate(-354.892 -1076.37) scale(1.59373)"
      />
      <circle
        cx={525.548}
        cy={1693.74}
        r={0.96}
        fill="none"
        stroke="#75fbee"
        strokeWidth=".7px"
        transform="translate(-388.957 -1415.88) translate(-1554.33 -4616.94) scale(3.36992) translate(-553.649 -2081.72) scale(2.38865) matrix(.86076 0 0 .86076 31.976 214.5)"
      />
      <circle
        cx={525.548}
        cy={1693.74}
        r={0.96}
        fill="#6efbee"
        stroke="#75fbee"
        strokeWidth=".64px"
        transform="translate(-388.957 -1415.88) translate(-1554.33 -4616.94) scale(3.36992) translate(-553.649 -2081.72) scale(2.38865) matrix(.86076 0 0 .86076 49.792 208.015)"
      />
      <circle
        cx={525.548}
        cy={1693.74}
        r={0.96}
        fill="none"
        stroke="#75fbee"
        strokeWidth=".63px"
        transform="translate(-388.957 -1415.88) translate(-1554.33 -4616.94) scale(3.36992) translate(-553.649 -2081.72) scale(2.38865) translate(-340.447 -1066.17) scale(1.59373)"
      />
      <path
        d="M518.327 1755.87l3.846-3.84v-3.61l3.044-3.04v-17.25l-3.99-3.99v-11.8l4.184-4.19v-11.17"
        fill="none"
        stroke="#75fbee"
        strokeWidth="1px"
        transform="translate(-388.957 -1415.88) translate(-1554.33 -4616.94) scale(3.36992) translate(-553.649 -2081.72) scale(2.38865) translate(-28.273 -61.895)"
      />
      <path
        d="M525.217 1741.97l5.243-5.25v-7.82"
        fill="none"
        stroke="#75fbee"
        strokeWidth="1px"
        transform="translate(-388.957 -1415.88) translate(-1554.33 -4616.94) scale(3.36992) translate(-553.649 -2081.72) scale(2.38865) translate(-28.273 -61.895)"
      />
    </svg>
  );
}

function HT4Layout2(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 459 2529"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      {...props}
    >
      <circle
        cx={694.617}
        cy={1793.04}
        r={4.043}
        fill="#75fbee"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(.033 -316.457)"
      />
      <circle
        cx={694.617}
        cy={1793.04}
        r={4.043}
        fill="#75fbee"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(3.306 -302.668)"
      />
      <circle
        cx={694.617}
        cy={1793.04}
        r={4.043}
        fill="#75fbee"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(10.709 -290.486)"
      />
      <circle
        cx={694.617}
        cy={1793.04}
        r={4.043}
        fill="#75fbee"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(20.891 -281.139)"
      />
      <circle
        cx={694.617}
        cy={1793.04}
        r={4.043}
        fill="#75fbee"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(32.25 -271.845)"
      />
      <circle
        cx={694.617}
        cy={1793.04}
        r={4.043}
        fill="#75fbee"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(46.548 -269.802)"
      />
      <path
        d="M589.537 855.606V1931.53"
        fill="none"
        stroke="#75fbee"
        strokeWidth="3.5px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(-.579 -.84) scale(1.00098)"
      />
      <path
        d="M589.537 882.851V1931.53"
        fill="none"
        stroke="#75fbee"
        strokeWidth="3.5px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(21.892)"
      />
      <path
        d="M589.537 915.688V1931.53"
        fill="none"
        stroke="#75fbee"
        strokeWidth="3.5px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(42.233)"
      />
      <path
        d="M589.537 946.855v984.675"
        fill="none"
        stroke="#75fbee"
        strokeWidth="3.5px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(64.21)"
      />
      <path
        d="M589.537 979.633v951.897"
        fill="none"
        stroke="#75fbee"
        strokeWidth="3.5px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(83.35)"
      />
      <path
        d="M589.455 1792.2h105.077"
        fill="none"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(0 -315.788)"
      />
      <path
        d="M589.455 1792.2h88.16"
        fill="none"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(20.905 -301.208)"
      />
      <path
        d="M589.455 1792.2h73.583"
        fill="none"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(41.851 -289.756)"
      />
      <path
        d="M589.455 1792.2h62.771"
        fill="none"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(63.851 -280.133)"
      />
      <path
        d="M589.455 1792.2h55.238"
        fill="none"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(82.831 -271.128)"
      />
      <path
        d="M741.408 1839.46v92.78"
        fill="none"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(0 -315.788)"
      />
      <path
        d="M718.369 1783.5c3.391-24.53 34.14-38.78 54.224-16.49 16.228 18.02 2.363 50.19-22.67 49.24"
        fill="none"
        stroke="#75fbee"
        strokeWidth="3.5px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(0 -315.788)"
      />
      <path
        d="M722.749 1786.36c1.446 14.91 10.102 22.87 24.89 24.93"
        fill="none"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(0 -315.788)"
      />
      <path
        d="M723.282 1797.09c1.098 8.77 14.182 16.48 24.357 14.2"
        fill="none"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) rotate(57.551 1038.246 1633.954)"
      />
      <path
        d="M723.282 1797.09c1.098 8.77 14.182 16.48 24.357 14.2"
        fill="none"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) rotate(-26.353 51.707 1614.37)"
      />
      <circle
        cx={748.033}
        cy={1785.63}
        r={10.603}
        fill="none"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(0 -315.788)"
      />
      <circle
        cx={748.339}
        cy={1785.76}
        r={4.17}
        fill="#5afbee"
        stroke="#75fbee"
        strokeWidth="2px"
        transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) translate(0 -315.788)"
      />
      <g>
        <circle
          cx={694.617}
          cy={1793.04}
          r={4.043}
          fill="#75fbee"
          stroke="#75fbee"
          strokeWidth="3.11px"
          transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) matrix(.55732 0 0 .55732 -832.26 787.053) matrix(-1.67326 0 0 1.67326 3713.42 -2882.21)"
        />
        <circle
          cx={694.617}
          cy={1793.04}
          r={4.043}
          fill="#75fbee"
          stroke="#75fbee"
          strokeWidth="3.11px"
          transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) matrix(.55732 0 0 .55732 -832.26 787.053) matrix(-1.67326 0 0 1.67326 3752.21 -2831.28)"
        />
        <circle
          cx={694.617}
          cy={1793.04}
          r={4.043}
          fill="#75fbee"
          stroke="#75fbee"
          strokeWidth="3.11px"
          transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) matrix(.55732 0 0 .55732 -832.26 787.053) matrix(-1.67326 0 0 1.67326 3788.59 -2774.51)"
        />
        <circle
          cx={694.617}
          cy={1793.04}
          r={4.043}
          fill="#75fbee"
          stroke="#75fbee"
          strokeWidth="3.11px"
          transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) matrix(.55732 0 0 .55732 -832.26 787.053) matrix(-1.67326 0 0 1.67326 3828.01 -2716.95)"
        />
        <circle
          cx={694.617}
          cy={1793.04}
          r={4.043}
          fill="#75fbee"
          stroke="#75fbee"
          strokeWidth="3.11px"
          transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) matrix(.55732 0 0 .55732 -832.26 787.053) matrix(-1.67326 0 0 1.67326 3862.22 -2658.56)"
        />
        <circle
          cx={694.617}
          cy={1793.04}
          r={4.043}
          fill="#75fbee"
          stroke="#75fbee"
          strokeWidth="3.11px"
          transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) matrix(.55732 0 0 .55732 -832.26 787.053) matrix(-1.67326 0 0 1.67326 3713.14 -1763.44)"
        />
        <circle
          cx={694.617}
          cy={1793.04}
          r={4.043}
          fill="#75fbee"
          stroke="#75fbee"
          strokeWidth="3.11px"
          transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) matrix(.55732 0 0 .55732 -832.26 787.053) matrix(-1.67326 0 0 1.67326 3752.02 -1737.31)"
        />
        <circle
          cx={694.617}
          cy={1793.04}
          r={4.043}
          fill="#75fbee"
          stroke="#75fbee"
          strokeWidth="3.11px"
          transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) matrix(.55732 0 0 .55732 -832.26 787.053) matrix(-1.67326 0 0 1.67326 3788.63 -1717.03)"
        />
        <circle
          cx={694.617}
          cy={1793.04}
          r={4.043}
          fill="#75fbee"
          stroke="#75fbee"
          strokeWidth="3.11px"
          transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) matrix(.55732 0 0 .55732 -832.26 787.053) matrix(-1.67326 0 0 1.67326 3828.36 -1698.8)"
        />
        <circle
          cx={694.617}
          cy={1793.04}
          r={4.043}
          fill="#75fbee"
          stroke="#75fbee"
          strokeWidth="3.11px"
          transform="translate(-3244.97 -447.871) translate(-1554.33 -4616.94) scale(3.36992) translate(1020.85 917.77) scale(.69039) matrix(.55732 0 0 .55732 -832.26 787.053) matrix(-1.67326 0 0 1.67326 3862.54 -1682.42)"
        />
      </g>
    </svg>
  );
}

function HT5Wifi(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 288 281"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M3315.12 172.025c.79 1.379.99 2.439 1.73 4.507.75 1.835.94 2.662.96 4.075-.16 1.395-.15 2.204-.15 3.013-1.47 3.54-2.2 7.711-4.56 10.492-5.58 6.562-12.86 7.356-20.88 4.423-17.38-6.354-35.35-9.48-53.87-8.598-59.5 2.832-102.36 31.4-129.48 84.127-1.22 2.362-2 4.977-3.43 7.191-5.41 8.4-15.24 11.146-23.39 6.727-8.62-4.665-11.55-13.391-7.43-22.872 17.07-39.275 44.69-68.859 82.19-89.379a94.244 94.244 0 0013.37-8.855c-.07-.786.03-.616.03-.616 3.28 3.38 6.25.314 9.12-.668 18.57-6.365 37.49-11.721 57.19-11.379 14.9.258 29.76 2.69 44.62 4.289 4.94.533 9.85 1.484 15.61 2.256.48.476.51.907 1.3 1.297 5.72 3.211 11.1 6.43 17.07 9.97m-150.49 9.438c-31.25 16.182-55.91 39.336-73.57 69.814-2.83 4.883-5.27 10.018-7.58 15.174-3.1 6.936-2.03 11.518 2.82 13.734 4.95 2.259 9.63.194 12.9-5.82 1.27-2.336 2.29-4.806 3.49-7.183 15.34-30.376 37.9-53.705 68.32-69.055 39.68-20.017 80.58-23.727 122.7-8.194 1.25.461 2.48 1.039 3.77 1.312 5.26 1.112 9.34-1.226 10.92-6.158 1.52-4.703.11-8.482-4.88-10.447-6.47-2.551-13.11-4.889-19.87-6.506-40.69-9.738-79.94-5.36-119.02 13.329z"
        fill="#a29880"
        fillRule="nonzero"
        transform="translate(-3362.36 -107.199) rotate(-110.517 2238.663 10.617) scale(1.29046) translate(-1980.35 620.651)"
      />
      <path
        d="M3126.12 315.903c-11.95-7.128-14.36-13.213-9.18-25.145 10.46-24.091 26.51-43.866 48.24-58.664 39.14-26.652 81.39-33.061 126.63-18.496 5.15 1.659 9.99 3.671 12.84 8.766 3.36 6.022 3.59 12.003.14 18.031-3.49 6.088-8.94 8.856-15.77 8.477-3.27-.181-6.57-1.124-9.7-2.172-51.61-17.272-107.25 7.952-129.72 56.497-5.52 11.923-9.56 13.961-23.48 12.706m85.08-77.964c16.17-4.414 32.51-7.421 49.28-4.237 8.46 1.607 16.77 4.006 25.16 6.015 5.95 1.426 10.82-.709 12.37-5.363 1.52-4.561-.36-8.458-5.97-10.997-4.22-1.912-8.64-3.549-13.13-4.675-57.97-14.523-120.07 12.623-149.01 65.101-2.24 4.065-4.3 8.298-5.84 12.664-1.76 4.988.05 9.057 4.14 10.97 3.95 1.849 8.41.52 11.33-3.542.96-1.337 1.63-2.892 2.34-4.394 14.07-29.836 36.89-49.96 69.33-61.542z"
        fill="#a29880"
        fillRule="nonzero"
        transform="translate(-3362.36 -107.199) rotate(-110.517 2238.663 10.617) scale(1.29046) translate(-1980.35 620.651)"
      />
      <path
        d="M3279.76 298.393c-2.08-.164-4.17-.329-7.47-.852-2.25-.749-3.27-1.14-4.3-1.532-29.79-8.691-63.37 5.776-76.08 33.505-3.35 7.317-7.83 13.013-17.63 14.636-2.35.007-3.29-.101-4.23-.209-13.56-6.239-17.16-14.467-11.23-26.997 23.08-48.823 75.03-67.54 120.21-54.658 6.44 1.834 12.79 4.119 16.38 12.256.95 3.013 1.56 4.588 2.16 6.162-1.68 7.368-5.37 13.345-13.35 17.463-2.38.217-3.42.221-4.46.226m-35.93-13.908c10.08-.798 19.88.631 29.52 3.544 7.23 2.187 12.3.427 14.08-4.744 1.85-5.355-1.14-9.425-8.75-11.927-.31-.104-.62-.219-.94-.317-41.81-12.902-87.59 5.751-108.32 44.243-1.72 3.184-3.5 6.65-3.87 10.131-.27 2.523 1.03 6.468 2.95 7.647 2.39 1.473 6.36 1.558 9.21.723 2.07-.61 3.95-3.427 5.03-5.682 12.08-25.068 32.13-39.092 61.09-43.618z"
        fill="#a29880"
        fillRule="nonzero"
        transform="translate(-3362.36 -107.199) rotate(-110.517 2238.663 10.617) scale(1.29046) translate(-1980.35 620.651)"
      />
      <path
        d="M3209.81 349.824c.06-1.656.14-3.312.2-4.969.58-19.425 14.32-34.086 32.67-34.872 18.2-.778 31.29 11.814 33.43 33.655-.14 2.374-.24 3.279-.34 4.185-.55 1.565-1.02 3.166-1.66 4.692-8.01 18.88-16.2 22.232-31.23 23.031-12.02.638-26.99-6.847-32.12-23.765l-.95-1.957m56.61-13.724c-2.18-3.646-3.81-7.802-6.65-10.834-6.72-7.193-18.79-8.354-27.59-3.325-10.31 5.89-15.27 17.033-12.4 27.868 2.65 9.988 11.33 16.648 22 16.885 15.71.349 25.9-11.431 24.64-30.594z"
        fill="#a29880"
        fillRule="nonzero"
        transform="translate(-3362.36 -107.199) rotate(-110.517 2238.663 10.617) scale(1.29046) translate(-1980.35 620.651)"
      />
    </svg>
  );
}

function HT5Bug(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 215 342"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M147.795 1300.41c-9.334-1.14-16.604 3.14-24.007 8.74 4.267 17.85 2.336 35.12-4.498 52.85 14.336 2.36 27.908.91 41.803 2.09v12.58c-8.25 0-16.155.02-24.06 0-7.322-.03-15.713-2.35-21.658.48-5.758 2.74-8.957 10.8-13.357 16.46-5.094 6.56-10.272 13.05-15.954 20.26 10.741 11.32 21.66 22.83 33.604 35.42-3.274 2.63-6.081 4.88-9.635 7.74-12.445-9.84-21.915-23.24-34.001-33.63-12.566 8.31-24.688 16.32-37.934 25.08v48.91c-2.669.4-4.58.84-6.505.92-1.954.08-3.923-.2-6.716-.37v-44.76c-7.682 1.06-14.398 1.97-21.996 2.86-.881-4.12-.881-8.21-.064-12.88 1.481-.58 2.15-.51 2.808-.57 16.763-1.42 31.17-9 44.902-17.84 20.64-13.3 37.132-30.63 49.553-52.61-23.315-23.91-46.197-47.39-69.718-71.52C20.52 1307.35 11.26 1313.67 2 1320v-19.09c1.188-.57 2.773.44 3.502 0 5.976-3.55 11.69-7.54 17.696-11.04 3.51-2.04 3.802-5.05 3.86-8.46.179-10.62.438-21.23.632-31.85.059-3.28.009-6.57.009-10.44H40.34v41.8c5.885-1.24 11.029-2.26 16.142-3.41 10.504-2.38 21.071-2.93 31.504-.08 5.218 1.42 8.22-.43 10.485-4.74 4.113-7.83 6.575-15.92 3.763-26.22-.567-2.38-.822-3.38-1.084-5.05 2.056-5.67 6.763-5.68 11.423-7.46 1.486 5.09 2.755 9.44 3.948 14.53.023 1.72.123 2.7.13 4.54.197 12.26-3.732 22.35-9.416 30.83 4.048 4.13 7.695 7.86 10.353 10.57 8.385-2.39 16.259-4.63 24.672-7.04 1.6-.52 2.662-.88 4.503-1.04 7.569 1.74 14.357 3.29 20.913 5.25-.112 1.02.05 1.63.254 2.22-1.565 2.85-3.131 5.71-5.029 9.17-2.309-.46-4.751-.94-8.387-2-3.037-.58-4.878-.58-6.719-.58m-66.555 33.35c7.987 8.2 15.975 16.41 24.787 25.45 6.032-14.4 8.745-27.53 5.99-41.27-2.676-13.35-10.112-23.29-23.547-27.13-14.848-4.24-29.411-2.16-45.088 4.21 12.842 13.1 24.883 25.39 37.858 38.74z"
        fill="#a99f90"
        fillRule="nonzero"
        transform="translate(-3653.61 -531.315) matrix(-1.29046 0 0 1.29046 5486.04 -985.658) translate(1252.05 -58.432)"
      />
      <path
        d="M84.13 1310.05c-4.936 3.45-9.306 3.7-13.313.22-3.688-3.21-4.145-7.51-2.282-11.74 1.754-3.99 5.299-5.74 9.662-5.46 4.551.3 8.243 3.39 8.52 8.07.161 2.72-1.266 5.53-2.587 8.91z"
        fill="#a89d8f"
        fillRule="nonzero"
        transform="translate(-3653.61 -531.315) matrix(-1.29046 0 0 1.29046 5486.04 -985.658) translate(1252.05 -58.432)"
      />
      <path
        d="M106.854 1330.69c-7.281 5.38-9.422 5.62-13.571 2.17-3.602-3-4.852-7.65-2.903-11.62 1.951-3.97 5.222-5.88 9.702-5.47 4.56.42 7.728 3.46 8.253 8.45.197 1.87-.628 3.85-1.481 6.47z"
        fill="#a99f90"
        fillRule="nonzero"
        transform="translate(-3653.61 -531.315) matrix(-1.29046 0 0 1.29046 5486.04 -985.658) translate(1252.05 -58.432)"
      />
    </svg>
  );
}

function HT5Laptop(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 514 499"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M1020.25 1803.81c-2.16-8.98-4.15-18-6.52-26.93-3.66-13.73-7.57-27.4-11.66-42.43-.34-1.76-.39-2.19-.45-2.61.3-10.2 5.39-16.43 15.36-18.7 2.22-.51 4.39-1.25 7.77-2.32 2.63-1.11 4.07-1.79 5.51-2.47 14.44-2.47 28.66-5.54 41.16-13.9 1.99-1.32 5.3-2.46 7.25-1.72 5.61 2.12 10.59.1 15.6-1.28 55.86-15.38 111.69-30.87 167.52-46.36 10.58-2.94 21.11-6.07 31.7-9 12.55-3.47 20.78 1.05 24.23 13.69 15.15 55.57 30.19 111.16 45.24 166.76.78 2.86 1.22 5.81 2 9.57 8.77-2.18 17.25-4.29 27.24-6.77-1.79 8.11-2.63 14.71-4.89 20.78-.89 2.36-4.76 4.3-7.65 5.11-25.31 7.14-50.74 13.89-76.08 20.93-48.76 13.54-97.49 27.2-147.46 41.31-1.65.61-2.07.71-2.49.81-9.34 2.51-18.67 5.03-29.32 7.78-2.32.72-3.32 1.2-5.1 1.73-26.22 6.9-51.66 13.75-77.66 20.22-5.45-5-10.34-9.61-15.25-14.75-.05-1.25-.09-1.96.63-2.87 8.65-2.47 16.54-4.73 24.31-6.96-1.98-7.02-3.75-13.37-5.56-19.71-3.81-13.35-7.64-26.69-11.51-40.67-.54-2.23-1.04-3.82-1.55-5.42-3.39-12.8-6.79-25.6-10.42-39.7-.81-2.24-1.38-3.18-1.95-4.12m228.79-139.9c-77.22 21.48-154.43 42.97-231.39 64.38.46 11.67 42.98 167.11 47.81 174.67 94.3-25.69 188.72-52.05 282.85-78.39-1.1-13.64-43.55-168.27-47.89-174.67-16.45 4.5-33.12 9.05-51.38 14.01m-172.83 29.23c-.67.58-1.34 1.16-2.01 1.73.78.36 1.56.71 2.34 1.07.33-.86.67-1.71-.33-2.8z"
        fill="#80a532"
        fillRule="nonzero"
        transform="translate(-2987.64 -1547.2) rotate(57.283 2773.562 2931.277) scale(1.29046) translate(419.855 -305.582)"
      />
      <path
        d="M1114.27 1803.41c11.51 1.88 22.31 3.52 33.68 5.24.93 3.19 1.81 6.21 3.13 10.73-19.04-2.51-36.62-4.84-53.72-7.1-3.94-9.1-4.04-9.23 1.92-14.03 12.11-9.77 24.34-19.38 37.45-29.8 1.39 3.64 2.49 6.48 3.93 10.25-6.93 5.43-13.84 10.47-20.28 16.06-2.65 2.31-7.59 3.19-6.11 8.65zM1246.12 1789.92c-2.16 1.42-3.78 2.39-5.44 3.4-4.19-8.89-4.18-8.89 2.38-14.34 7.06-5.87 14.11-11.75 23.05-19.19-8.38-1.33-14.42-2.34-20.47-3.24-2.95-.43-5.95-.56-8.9-.99-8.15-1.17-8.15-1.2-9.51-11.66 8.05.94 15.88 1.76 23.69 2.79 7.56 1 15.09 2.24 22.64 3.3 7.75 1.1 7.75 1.06 9.17 10.36-11.87 9.58-23.97 19.36-36.61 29.57zM1192.3 1741.21c-.32 20.53-.55 40.18-.96 59.82-.21 9.85-.35 9.84-10.96 10.93v-79.08c4.13-1.22 7.44-2.2 11.94-3.52 0 4.52 0 7.75-.02 11.85z"
        fill="#7b9e31"
        fillRule="nonzero"
        transform="translate(-2987.64 -1547.2) rotate(57.283 2773.562 2931.277) scale(1.29046) translate(419.855 -305.582)"
      />
    </svg>
  );
}

function HT5Logs(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 393 432"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M2917.83 525.493c2.82-13.608 5.75-27.193 8.41-40.833 1.94-10.022 6.61-14.906 15.52-14.955 2.92-.016 5.99.574 8.72 1.602 17.74 6.678 35.39 13.556 53.08 20.361 2.74 1.054 5.5 2.07 9.04 3.402 3.81-6.604 7.34-12.915 11.05-19.119 6.44-10.788 11.41-12.574 23.15-8.176 19.93 7.459 39.81 15.042 60.8 23.119 2.03.885 2.98 1.226 3.93 1.567 10.31 3.889 20.62 7.777 31.93 12.051 1.47.871 2.05 1.173 2.72 1.291 4.14 1.943 8.27 3.887 13.23 6.632 1.42 1.065 2.02 1.328 2.65 2.306.23 2.131.43 3.546.56 5.557.27 1.725.62 2.855.98 4.81.23 4.105.45 7.386.57 11.428.48 3.054 1.05 5.346 1.63 7.638 7.39 2.898 14.71 5.993 22.19 8.63 6.02 2.122 10.54 5.439 12.33 13.036.14 1.155.38 2.053.38 2.053-.15.905-.31 1.81-.56 4.111-3.34 9.517-6.56 17.639-10.13 26.288-.79 1.668-1.24 2.807-1.7 3.946-1.51 4.439-3.03 8.878-4.24 14.25.31.933.26 1.065.26 1.065-1.37 1.968-3.16 3.767-4.04 5.933-2.9 7.071-5.54 14.252-8.14 21.444-.9 2.515-2.05 4.144-5.74 2.6-2.03-.925-3.32-1.256-4.62-1.587-1.39-9.246 1.33-17.714 4.63-26.175 6.53-16.73 12.8-33.559 19.64-51.55-40.25-17.527-81.4-31.469-122.46-48.335-3.92 6.663-7.58 12.847-11.2 19.049-1.51 2.587-2.92 5.238-4.45 7.812-2.59 4.362-6.18 5.658-11.02 3.733-8.36-3.315-16.78-6.458-25.17-9.673-14.56-5.581-29.12-11.163-44.9-17.21-15.21 37.588-28.62 75.384-43.57 113.869 3.41 1.703 6.42 3.518 9.65 4.774 32.88 12.79 65.77 25.526 98.7 38.189 8.99 3.459 12.58 11.932 18.7 18.07-3.94 4.95-7.42 1.832-10.47.683-13.08-4.932-26.01-10.243-39.03-15.306-26.37-10.246-52.79-20.352-79.13-30.654-13.68-5.351-20.44-17.234-18.17-31.507 3.18-20.052 6.43-40.093 9.9-61.476.32-2.317.39-3.296.45-4.276 1.38-8.675 2.76-17.351 4.1-27.542-.08-1.985-.12-2.455-.16-2.925m11.4 56.655c7.56-19.923 14.97-39.902 22.74-59.744 4.49-11.492 12.38-14.878 23.93-10.729 7.51 2.703 14.94 5.654 22.38 8.567 12.96 5.069 25.88 10.196 39.58 15.596 4.19-7.304 7.84-13.937 11.76-20.41 5.75-9.509 10.61-11.448 20.75-7.698 16.23 6.006 32.33 12.368 48.48 18.579 9.89 3.801 19.78 7.603 30.31 11.653v-15.586c-37.34-14.405-74.17-28.611-111.38-42.964-4.96 8.799-9.27 16.657-13.78 24.397-4.53 7.767-6.18 8.442-14.46 5.296-15.24-5.795-30.34-11.982-45.62-17.685-7.34-2.74-14.26-7.035-23.16-7.38-2.21 12.742-4.42 25.139-6.5 37.557-2.08 12.475-4 24.979-6.07 37.456-1.99 12.013-4.09 24.009-6.14 36.012l2.19.463c1.46-3.997 2.92-7.995 4.99-13.38z"
        fill="#7ea332"
        fillRule="nonzero"
        transform="translate(-2548.91 -1181.72) matrix(1.2604 .27688 -.27688 1.2604 1265.37 488.531) translate(-1784.39 -173.509)"
      />
      <path
        d="M3177.74 689.674c-2.44 2.451-3.06 5.076-.61 7.871 1.31 1.493 2.87 2.77 4.1 4.323 2.8 3.562 7.86 7.363 7.67 10.832-.34 6.295-3.17 12.787-6.33 18.438-1.34 2.403-5.99 3.444-9.34 4.119-4.45.895-9.08.826-14.54 1.24-.19 5.159-.81 9.716-.43 14.187.58 6.705-2.54 10.774-8.24 13.185-5.3 2.243-10.4 6.532-17.6 1.641a251.873 251.873 0 00-6.05-5.567c-2.29-1.826-4.59-3.653-7.5-5.976-5.07 5.083-9.71 9.746-15.27 15.065-1.25.766-1.59.875-1.94.984-6.13-2.266-12.62-3.89-18.21-7.087-2.52-1.441-3.93-5.873-4.63-9.204-1.01-4.758-.9-9.75-1.37-15.992-5.54 0-10.43-.267-15.27.068-5.86.405-9.48-2.226-11.67-7.351-1.17-2.747-2.22-5.549-3.44-8.278-2.17-4.905-.97-8.897 2.74-12.622 3.25-3.254 6.11-6.89 9.87-11.185-3.59-4.007-6.58-7.907-10.14-11.187-4.44-4.092-6.15-8.445-3.53-14.162.96-2.106 1.65-4.347 2.37-6.556 2.24-6.871 6.69-10.226 14.15-9.808 3.93.22 7.91-.486 13.06-.861.26-4.427 1.04-8.632.62-12.711-.83-7.891 2.42-12.666 9.7-15.19 1.86-.647 3.62-1.641 5.4-2.526 4.41-2.194 8.12-1.554 11.7 2.047 3.67 3.698 7.82 6.923 12.3 10.829 4.16-4.011 7.93-7.224 11.18-10.901 3.79-4.287 7.92-5.735 13.23-3.285 3.01 1.387 6.02 2.788 9.11 3.98 5.05 1.951 6.75 5.716 7 10.896.14 3.024 1.49 5.99 3.05 8.895.76-.089.65-.176.65-.176-.87 1.33-1.74 2.661-2.81 4.302 5.36 4.262 11.17 2.641 16.37 1.949 4.93-.657 7.48.556 9.1 5.076 1.23 3.414 2.93 6.659 4.47 9.957 2.35 5.048 2.03 9.619-3.31 14.367-2.54 2.688-4.08 4.531-5.61 6.374m-71.08 57.959c10.87-8.11 16.39-8.018 26.44.479.76.64 1.24 1.752 2.08 2.118 2.23.97 5.18 2.874 6.72 2.118 1.68-.827 2.43-4.145 2.97-6.518.59-2.562.29-5.31.67-7.937 1.42-10.032 5.24-13.861 15.35-15.309 2.96-.423 6.01-.205 8.95-.691 5.08-.839 6.8-5.379 3.59-9.462-1.84-2.345-4.21-4.274-6.13-6.566-6.95-8.311-7.06-14.62-.4-23.319 1.62-2.11 3.65-3.907 5.19-6.064 3.05-4.277 1.61-7.595-3.55-8.351-1.63-.24-3.32-.127-4.99-.121-11.44.048-18.93-3.736-20.12-17.032-.45-5.071-1.65-10.496-7.7-13.814-2.81 2.619-5.37 5.143-8.08 7.493-8.71 7.561-15.03 7.773-24.05.823-2.11-1.623-3.9-3.686-6.12-5.119-3.96-2.563-7.14-1.119-7.81 3.56-.57 3.938-.64 7.946-.99 11.918-.69 7.778-5.36 11.945-12.67 13.297-3.58.662-7.29.558-10.91 1.028-5.81.755-7.78 5.237-4.23 9.736 2.26 2.867 5.08 5.298 7.29 8.198 5.14 6.734 5.25 12.25.55 19.252-1.47 2.202-3.26 4.206-4.99 6.229-1.89 2.222-5.27 4.491-2.72 7.49 1.57 1.841 5.02 2.257 7.72 2.894 1.91.448 3.99.071 5.97.27 9.57.961 13.68 4.501 15.66 13.845.75 3.559.77 7.267 1.37 10.864.81 4.801 4.56 6.785 8.69 4.433 1.96-1.12 3.44-3.093 6.25-5.742z"
        fill="#7da132"
        fillRule="nonzero"
        transform="translate(-2548.91 -1181.72) matrix(1.2604 .27688 -.27688 1.2604 1265.37 488.531) translate(-1784.39 -173.509)"
      />
      <path
        d="M3087.54 708.069c-7.12-24.323 6.84-44.611 29.7-44.338 14.47.173 27.31 10.322 30.44 24.071 3.46 15.191-3.47 29.908-17.27 36.654-13.18 6.439-29.34 2.761-38.46-8.888-1.62-2.068-2.75-4.522-4.41-7.499m43.28-23.493c-.92-.958-1.71-2.083-2.76-2.848-7.95-5.772-17.13-5.393-23.57.891-5.9 5.759-7 15.832-2.5 22.932 4.36 6.87 13.35 9.782 20.97 6.787 8.57-3.372 12.83-11.351 10.98-20.954-.37-1.904-1.47-3.667-3.12-6.808z"
        fill="#7da132"
        fillRule="nonzero"
        transform="translate(-2548.91 -1181.72) matrix(1.2604 .27688 -.27688 1.2604 1265.37 488.531) translate(-1784.39 -173.509)"
      />
    </svg>
  );
}

function HT5Lang(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 396 402"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M928.02 193.663c.277 10.603-1.113 19.621-9.602 25.892-11.141 8.23-32.092 8.449-43.502.593-4.606-3.172-7.654-7.168-8.477-13.602 7.991-.604 15.211-2.993 22.326 3.432 4.331 3.91 10.76 3.004 16.041.131 4.896-2.665 5.711-6.072 4.58-16.47-7.375 4.554-14.892 7.141-23.609 4.828-7.253-1.925-12.585-5.8-16.089-12.298-6.217-11.525-6.661-23.68-2.632-35.792 6.261-18.823 25.246-24.191 42.201-11.81 3.969-8.675 11.168-4.665 18.764-4.926l-.001 60.022m-23.561-11.854c6.407-7.819 7.915-19.733 3.521-27.743-2.614-4.764-6.695-7.626-12.047-7.496-5.453.132-9.644 3.341-11.126 8.522-1.339 4.684-2.415 9.848-1.853 14.593 1.474 12.453 7.456 15.972 21.505 12.124zM761.47 194.521c-7.819 3.063-15.082 6.833-23.924 5.93-9.783-.998-16.462-6.078-17.747-14.465-1.77-11.554 2.302-20.282 12.106-23.389 6.914-2.192 14.3-2.916 21.493-4.2 3.765-.673 7.579-1.294 7.071-6.413-.448-4.523-3.759-5.99-7.731-6.222-5.377-.314-10.639-.56-13.898 5.338-.877 1.588-3.496 2.795-5.468 3.069-3.534.49-7.184.138-10.772.138-.117-10.891 4.015-17.568 12.957-20.411 9.731-3.094 19.705-3.269 29.48-.141 9.034 2.891 12.841 8.23 12.994 17.802.16 9.983-.178 19.977.138 29.953.17 5.39 1.253 10.752 2.041 17.059-4.657 0-9.87.202-15.046-.154-1.162-.08-2.19-2.106-3.694-3.894m-3.046-25.899c-5.156 1.163-10.4 2.04-15.445 3.57-4.931 1.496-7.044 5.456-5.87 9.882 1.248 4.709 4.821 5.92 9.155 5.784 10.56-.332 15.511-7.237 12.16-19.236zM798.91 198.812c-5.326.284-5.296-2.803-5.293-5.945.013-13.973-.004-27.947-.008-41.92-.002-5.587-.001-11.174-.001-17.512 6.808 1.155 14.049-4.336 17.987 5.729 6.57-5.94 14.161-8.396 22.834-7.216 10.214 1.389 17.966 7.807 18.465 17.897.782 15.843.207 31.753.207 48.306h-17.308c0-7.761.006-15.304-.002-22.847-.007-5.988.196-11.988-.11-17.962-.351-6.831-3.473-10.295-9.218-11.035-6.42-.826-12.57 2.52-14.169 8.379-.945 3.466-1.043 7.229-1.089 10.863-.132 10.58-.047 21.162-.047 32.702-4.342.218-7.886.397-12.248.561z"
        fill="#a89e84"
        fillRule="nonzero"
        transform="translate(-2440.05 -1677.34) rotate(-45.994 4397.05 387.397) scale(1.29046) translate(818.513 -38.033)"
      />
      <path
        d="M993.724 156.947c.22 3.399.22 6.014.22 8.978-10.589 1.372-12.289 8.191-11.67 16.774.357 4.961.111 9.97.042 14.957-.174 12.668-6.105 18.872-18.76 19.505-2.6.131-5.226-.24-8.527-.417V206.74c1.375-.279 2.619-.742 3.864-.746 5.582-.017 7.603-3.092 7.535-8.267-.073-5.651.21-11.314-.041-16.954-.383-8.589 1.815-15.707 10.928-19.866-9.23-4.759-11.456-12.3-10.92-21.253.238-3.976.057-7.978.033-11.967-.065-11.033-.072-11.033-11.593-13.708l-.565-8.38c1.274-.636 2.117-1.394 2.991-1.432 3.311-.143 6.687-.437 9.94.022 9.479 1.34 14.714 7.262 15.069 16.808.185 4.981.561 10.035-.038 14.947-1.184 9.691 1.544 16.803 11.492 21.003zM639.842 117.859c2.624-4.128 5.249-8.255 8.062-13.042.189-.659.365-.493.365-.493h19.017v9.702l-10.817 2.644c-.353 7.965-1.095 16.126-.969 24.274.129 8.287-1.864 15.143-10.656 19.789 9.23 4.573 11.366 11.931 10.626 20.727-.334 3.964-.095 7.978-.065 11.968.084 11.311.094 11.311 11.748 13.419v10.359c-4.932-.263-9.58.034-13.983-.865-7.987-1.63-12.643-7.276-13.181-15.377-.33-4.968-.128-9.972-.136-16.6-.087-2.631-.204-3.623-.32-4.615.165-9.062.102-9.156-8.914-12.304-1.222-.981-1.676-1.315-2.273-1.455v-10.372c10.796-1.997 12.48-9.418 11.572-18.512-.426-4.261-.341-8.572-.522-14.478.126-2.668.286-3.719.446-4.769z"
        fill="#a69c82"
        fillRule="nonzero"
        transform="translate(-2440.05 -1677.34) rotate(-45.994 4397.05 387.397) scale(1.29046) translate(818.513 -38.033)"
      />
      <path
        d="M689.738 157.996v-47.289h17.045v87.363h-16.852c-.063-12.802-.128-25.938-.193-40.074z"
        fill="#a89e84"
        fillRule="nonzero"
        transform="translate(-2440.05 -1677.34) rotate(-45.994 4397.05 387.397) scale(1.29046) translate(818.513 -38.033)"
      />
    </svg>
  );
}

function HT5Cogwheel(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 193 197"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M2612.99 267.704c3.95 8.573 7.65 16.588 11.86 25.718 4.89-1.184 10.07-2.039 14.95-3.745 4.49-1.566 7.75-.561 10.65 2.836 1.51 1.772 2.96 3.608 4.57 5.289 5.27 5.508 6.4 11.257 1.93 17.95-2.18 3.256-3.53 7.061-5.7 11.523 3.28 2.28 5.94 4.871 9.12 6.195 9.31 3.873 12.14 10.556 9.85 19.974-.24.961-.24 1.981-.32 2.977-.49 6.028-3.59 9.646-9.53 11.269-4.66 1.276-9.14 3.242-14.21 5.086 1.44 5.609 2.39 10.132 3.78 14.518 1.73 5.462.54 9.786-4.09 13.195-2.67 1.971-5.27 4.054-7.92 6.063-3.27 2.481-6.6 2.539-10.25.633-4.7-2.45-9.55-4.609-15.22-7.319-3.06 4.724-6.12 8.98-8.68 13.52-2.63 4.669-6.36 6.582-11.55 5.938-2.31-.288-4.62-.94-6.92-.913-7.65.089-11.46-3.993-13.11-11.062-.88-3.811-2.38-7.48-3.89-12.078-5.53 1.088-10.47 1.569-15.06 3.083-5.69 1.874-9.71.155-13.12-4.211-1.22-1.573-2.22-3.349-3.57-4.796-5.07-5.416-5.36-10.883-1.15-17.063 2.2-3.219 3.47-7.067 5.55-11.448-4.82-3.229-9.04-6.375-13.57-8.992-4.27-2.468-6.19-5.808-5.69-10.656.13-1.321.1-2.66.14-3.991.26-9.164 3.3-16.254 14.58-18.593 2.63-1.062 4.12-1.584 5.61-2.106 1.12-1.372 3.17-2.752 3.16-4.115-.03-2.926-1.06-5.858-1.78-8.761-2.58-10.389 3.3-20.838 13.78-23.415 2.6-.637 5.88.313 8.52 1.353 4.28 1.687 8.3 4.05 13.59 6.707 2.82-4.322 5.65-8.234 8.04-12.397 3.04-5.303 6.94-8.504 13.49-8.483m-11.29 29.252c-5.45 5.705-11.78 5.4-18.4 2.581-2.75-1.174-5.3-2.842-8.09-3.894-4.43-1.669-7.34.381-6.97 5.027.23 2.955 1.39 5.824 1.85 8.775 1.79 11.396-1.33 16.752-12.04 20.933-1.24.485-2.49.946-3.77 1.316-3.22.93-6.56 1.537-6.9 5.952-.33 4.277 2.88 5.595 5.65 7.377 1.95 1.263 4.01 2.408 5.83 3.85 7 5.557 8.48 10.925 5.26 19.367-1.18 3.104-2.92 5.998-4.1 9.101-1.89 4.944.2 7.616 5.58 7.083 2.63-.26 5.19-1.195 7.82-1.632 11.13-1.856 16.17.937 20.27 11.27.98 2.472 1.54 5.118 2.57 7.564 2.52 5.936 7.24 6.351 11.07.986 1.55-2.163 2.71-4.603 4.27-6.757 6.75-9.35 11.77-10.735 22.22-6.155 2.43 1.066 4.66 2.615 7.13 3.574 4.94 1.919 7.83-.224 7.28-5.503-.34-3.293-1.51-6.494-1.93-9.785-1.25-9.804 1.14-14.1 10.06-18.274 3.01-1.41 6.3-2.253 9.22-3.812 5.41-2.883 5.57-7.124.57-10.647-2.45-1.723-5.15-3.095-7.54-4.882-7.81-5.831-9.3-10.652-6.08-19.947.98-2.816 2.77-5.364 3.62-8.203.6-1.962 1.08-4.921.06-6.145-1.12-1.35-4.05-1.739-6.13-1.619-2.95.17-5.82 1.448-8.78 1.8-9.96 1.186-14.82-1.734-18.65-11.088-1.13-2.768-1.73-5.766-2.94-8.491-2.4-5.372-7.24-5.792-10.64-.915-2.28 3.266-4.22 6.769-7.37 11.193z"
        fill="#64974f"
        fillRule="nonzero"
        transform="translate(-2940.99 -2041.97) translate(378.57 1352.73) scale(1.29046) translate(-535.96 266.72)"
      />
      <path
        d="M2601.04 375.865c-12.59 1.314-22.49-2.291-29.92-11.613-11.77-14.761-8.13-37.121 7.54-47.273 16.01-10.378 36.23-4.811 45.9 12.639 8.7 15.713 1.1 36.733-16.03 44.104-2.12.91-4.43 1.363-7.49 2.143m-13.24-47.472c-2.35 2.262-5.29 4.166-6.97 6.853-5.37 8.563-2.05 19.935 6.85 24.879 8.95 4.971 19.62 1.248 24.18-8.389 3.17-6.688 2.44-13.144-2.14-18.664-5.38-6.473-12.35-8.659-21.92-4.679z"
        fill="#64974f"
        fillRule="nonzero"
        transform="translate(-2940.99 -2041.97) translate(378.57 1352.73) scale(1.29046) translate(-535.96 266.72)"
      />
    </svg>
  );
}

function HT5Robot(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 353 416"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M341.75 719.931c2.561-2.921 5.122-5.843 8.466-9.631 1.821-1.938 2.86-3.009 3.898-4.08 17.149-14.836 36.9-23.649 59.616-25.086 6.59-.417 13.269.218 19.878.739 1.564.124 3.011 1.735 4.515 2.663-2.327 4.264-5.537 2.563-8.351 2.667-8.601.318-17.205.618-25.793 1.159-4.772.3-7.307 2.731-8.784 7.767-8.723 29.749-28.131 49.215-57.913 57.995-4.899 1.444-6.738 4.103-7.613 8.97-11.228 62.456 38.716 116.845 101.836 110.691 1.983-.193 3.937-.76 5.92-.87 5.499-.304 7.649-3.222 9.116-8.539 7.161-25.953 23.163-44.506 48.098-55.076 2.75-1.165 5.578-2.63 8.466-2.89 6.827-.613 9.043-4.666 9.235-10.713.275-8.615.504-17.232.836-25.844.08-2.067.489-4.122.746-6.182l2.073-.367c.876 1.775 2.281 3.474 2.546 5.336 2.753 19.357-.757 37.761-8.957 55.358-1.683 3.613-3.732 7.057-6.386 11.52-1.477 2.197-2.181 3.452-2.886 4.708-10.305 12.41-21.85 23.318-36.623 30.341-22.307 10.604-45.409 12.123-70.475 5.839-1.962-.334-2.63-.387-3.298-.44-12.633-5.899-25.479-11.51-35.33-21.842-5.95-6.242-11.587-12.783-17.737-20.256-.918-2.019-1.464-2.97-2.01-3.922-3.537-9.437-7.074-18.874-10.878-29.644a191.832 191.832 0 01-.493-2.563 137.03 137.03 0 00-.201-5.441c-.152-1.818-.417-2.374-.907-2.822a399.994 399.994 0 01-.309-7.147c-.055-1.606-.098-1.965 0-3.187 1.013-19.096 5.387-36.321 15.276-52.542 1.757-2.528 3.09-4.598 4.423-6.669z"
        fill="#7da132"
        fillRule="nonzero"
        transform="translate(-1313.3 -1790.44) scale(1.29046) rotate(-59.231 2080.95 1548.543) translate(1152.26 34.958)"
      />
      <path
        d="M448.283 656.137c9.638-7.266 19.766-13.461 31.82-16.033 30.084-6.421 60.444 8.256 74.238 36.077 1.176 2.372 2.261 4.789 3.287 6.971 21.028 6.565 26.556 16.673 18.552 35.566-1.195 1.609-1.739 2.255-2.282 2.901-1.648 1.13-3.19 3.018-4.96 3.264-9.979 1.385-13.614 8.989-17.821 16.622-4.545 8.245-10.853 14.776-20.011 18.646-5.093 2.153-8.117 2.152-12.108-1.957-20.894-21.51-42.097-42.721-63.188-64.042-4.218-4.264-8.259-8.717-12.669-12.771-3.542-3.256-3.988-6.433-1.676-10.599 1.918-3.459 3.216-7.262 5.237-11.936.825-1.586 1.203-2.148 1.581-2.709m67.443 67.136c7.873 7.865 15.153 16.389 24.467 23.18 5.085-6.329 9.946-11.707 10.536-19.745-8.313-4.728-13.624-11.099-13.552-20.881.073-10.056 6.632-16.086 14.209-21.762-9.169-21.329-24.156-34.56-46.711-38.444-19.088-3.288-35.983 1.2-50.478 14.424 1.07 1.625 1.495 2.573 2.178 3.265a45793.708 45793.708 0 0059.351 59.963m-13.667 9.667l23.248 23.211 11.107-5.961-85.382-83.759-5.334 9.008c18.682 19.067 37.021 37.784 56.361 57.501z"
        fill="#7b9e31"
        fillRule="nonzero"
        transform="translate(-1313.3 -1790.44) scale(1.29046) rotate(-59.231 2080.95 1548.543) translate(1152.26 34.958)"
      />
      <path
        d="M388.956 813.047c-20.023-20.764-16.467-53.863 5.773-69.893 26.639-19.201 64.951-4.032 70.897 28.299.67 3.641.091 7.512.091 11.276l-2.31.624c-.982-1.633-2.366-3.152-2.865-4.921-1.165-4.134-1.362-8.6-2.912-12.555-7.178-18.316-25.41-28.194-44.086-24.241-19.532 4.135-32.362 20.422-31.725 40.274.621 19.346 14.265 34.85 33.353 37.968 3.04.496 6.74-.401 8.622 3.357-8.193 5.576-20.256 2.075-34.838-10.188z"
        fill="#749530"
        fillRule="nonzero"
        transform="translate(-1313.3 -1790.44) scale(1.29046) rotate(-59.231 2080.95 1548.543) translate(1152.26 34.958)"
      />
      <path
        d="M404.899 788.758c8.635 10.752 18.885 12.821 26.905 6.017 11.288-9.576 8.804-25.815-4.875-31.635-2.882-1.226-5.865-2.214-9.452-3.556 6.946-5.295 14.319-3.47 20.97 4.097 9.317 10.6 8.617 25.435-1.65 34.976-8.678 8.064-22.994 8.069-31.917.011-7.41-6.692-9.609-15.517-4.318-21.825 1.467 4.151 2.723 7.704 4.337 11.915z"
        fill="#749530"
        fillRule="nonzero"
        transform="translate(-1313.3 -1790.44) scale(1.29046) rotate(-59.231 2080.95 1548.543) translate(1152.26 34.958)"
      />
      <path
        d="M392.01 621.556l22.433.638c1.096 5.691-2.136 5.714-5.153 5.763-8.964.145-17.93.279-26.895.28-9.616 0-19.234-.087-28.847-.287-2.76-.057-6.254.864-7.215-4.085 5.809-4.191 12.57-1.526 18.809-2.014 6.275-.492 12.613-.186 20.602-.259 3.208-.032 4.737-.034 6.266-.036z"
        fill="#7b9e31"
        fillRule="nonzero"
        transform="translate(-1313.3 -1790.44) scale(1.29046) rotate(-59.231 2080.95 1548.543) translate(1152.26 34.958)"
      />
      <path
        d="M385.746 643.645c-21.84-.215-43.681-.412-65.52-.735-.614-.009-1.207-1.367-2.542-2.98 2.51-.847 4.46-2.067 6.418-2.08 20.54-.141 41.082-.098 61.623-.048.563.001 1.124.638 1.884 2.04-.488 1.976-1.176 2.889-1.863 3.803zM594.42 669.189c-1.715.404-4.001.519-4.239-.123-.892-2.411-1.116-5.07-1.558-7.462l-9.538-2.998c1.073-6.222 6.227-3.322 9.376-5.546l2.393-8.831c5.963.901 3.203 6.178 5.557 8.813l9.216 3.039-.006 2.374-9.33 2.947c-.439 2.089-.97 4.62-1.871 7.787zM544.606 619.681c1.194-1.612 2.407-2.725 3.835-3.246 1.471-.536 3.151-.495 4.213-.636 2.917-2.869-.246-8.26 5.963-9.312.893 2.873 1.802 5.799 2.71 8.729 3.148.937 6.295 1.87 9.441 2.803l-.041 2.483-9.55 3.131-2.203 9.513c-6.451-.945-3.753-6.357-5.619-9.477-2.744-1.025-5.69-2.127-8.749-3.988zM513.279 682.823c4.497 5.07 9.949 8.504 12.82 15.044-1.942.648-3.68 1.68-4.089 1.297-6.715-6.303-13.335-12.715-19.751-19.323-.729-.751-.099-2.823-.099-6.726 4.529 3.928 7.58 6.573 11.119 9.708z"
        fill="#749530"
        fillRule="nonzero"
        transform="translate(-1313.3 -1790.44) scale(1.29046) rotate(-59.231 2080.95 1548.543) translate(1152.26 34.958)"
      />
    </svg>
  );
}

function HT6Sun(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 1399 1000"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <circle
        cx={3193.32}
        cy={1482.65}
        r={586.025}
        fill="url(#_Linear1HT6Sun)"
        transform="translate(-2512.5 -1047.26) rotate(90.016 3521.746 1458.69) scale(1.19296)"
      />
      <defs>
        <linearGradient
          id="_Linear1HT6Sun"
          x1={0}
          y1={0}
          x2={1}
          y2={0}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(2607.3 1482.65) scale(1172.05)"
        >
          <stop offset={0} stopColor="#e99c3d" />
          <stop offset={0.47} stopColor="#ef862c" stopOpacity={0.8} />
          <stop offset={1} stopColor="#ff4c00" stopOpacity={0.28} />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HT7Wireframe(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 1920 1080"
      {...props}
    >
      <style>
        {
          ".st1{opacity:.5;stroke:#00aeef;stroke-width:.25;stroke-miterlimit:10}.st1,.st2{fill:none}.st11,.st12,.st2,.st6{stroke:#00aeef;stroke-width:.25;stroke-miterlimit:10}.st6{opacity:.17;fill:none}.st11,.st12{fill:#edf0da}.st12{fill:#f7f4de}"
        }
      </style>
      <g>
        <path className="st1" d="M254.5 228.5L413.5 418.5 379.5 169.5" />
        <path className="st2" d="M841.5 590.5L973.5 665.5 950.5 528.5" />
        <path
          opacity={0.55}
          fill="none"
          stroke="#00aeef"
          strokeWidth={0.25}
          strokeMiterlimit={10}
          d="M1619.5 518.5L1756.5 796.5 1833.5 503.5"
        />
        <path className="st1" d="M1102.5 17.5L1011.5 269.5 1158.5 44.5" />
        <path
          d="M345.5 560.5s228 248 223 236-28-378-28-378"
          opacity={0.44}
          fill="none"
          stroke="#00aeef"
          strokeWidth={0.25}
          strokeMiterlimit={10}
        />
        <path className="st1" d="M1756.5 -0.5L1734.5 135.5 1911.5 -0.5" />
        <path
          opacity={0.2}
          fill="none"
          stroke="#00aeef"
          strokeWidth={0.25}
          strokeMiterlimit={10}
          d="M536 199L773 507 853 3"
        />
        <path className="st6" d="M1230 145L737 665 1421 931" />
        <path
          opacity={0.28}
          fill="none"
          stroke="#00aeef"
          strokeWidth={0.25}
          strokeMiterlimit={10}
          d="M1431 17L1586 216 1518 481 1911 488 1857 189 1649 -5"
        />
        <path
          d="M244 3S138 114 141 121s79 156 79 156L81 379 1 277 103-1"
          opacity={0.14}
          fill="none"
          stroke="#00aeef"
          strokeWidth={0.25}
          strokeMiterlimit={10}
        />
        <path
          className="st6"
          d="M54 492S-10 965 1 962s381.08-361.82 381.08-361.82L345 364l-91-57"
        />
        <path
          opacity={0.47}
          fill="none"
          stroke="#00aeef"
          strokeWidth={0.25}
          strokeMiterlimit={10}
          d="M457 -1L595 162 605 -1"
        />
        <path
          opacity={0.39}
          fill="none"
          stroke="#00aeef"
          strokeWidth={0.25}
          strokeMiterlimit={10}
          d="M1227 330L1184 518 1517 481"
        />
        <path className="st1" d="M856 319L856 492 1061 255" />
        <path className="st1" d="M645 149c5 3 33 118 33 118l-83-105" />
        <path
          className="st2"
          d="M1061.5 250.5l-205 246v-177l328.02 199 326.98-38s-6.82-140.73-11.41-141.36-76.92-183.12-76.92-183.12L1550.5 345.5l-8-266 229-80 101.41 55.66"
        />
        <path
          className="st2"
          d="M568.5 793.5l79.17 195.32 541.42-361.01-71.73 245.27-95.95-311.47-48.39 103.11L677.6 964.18l444.9-83.68 242 157-680-79 172-455-233.3 316.06 67.22-239.95-87.72-40.41 170.78-117.02 32.38 82.85L856.5 319.5l-126.04 64.15-53.92-114.15L605.5-.5l-10.28 167.41L1002.5-.5 756.23 370.02 856.5 319.5l146-320 228 147 147 165-310-60 444 229-280.08 159.38 133.08 397.62 186-692 137 346L1911.76 481 1771.5-.5l42 379 106-379-226 270c20 127-6 422-6 422s-271.17 351.98-263.58 352.99c7.58 1.01 408.59-114.44 408.59-114.44"
        />
        <path className="st2" d="M328.5 -0.5L0.5 269.5 553.5 657.5z" />
        <path
          className="st2"
          d="M271.5 328.5L228.94 81.46 0.5 -0.5 271.5 323.5 180.66 395.9 0.5 539.5"
        />
        <path
          className="st2"
          d="M490.42 461.51L649.6 269.5 428.5 280.5 401.5 -0.5 374.99 532.25 271.5 328.5 386.73 169.8 130.22 154.59 180.5 395.5 0.5 640.5 856.5 496.5 462.5 -0.5 424.68 280.78 597.5 160.5 488.41 467.16 684.5 342.5 553.5 657.5"
        />
        <path className="st2" d="M1550.5 350.5L1919.5 488.5 1693.5 269.5z" />
        <path
          className="st2"
          d="M374.5 532.5l143.42 20.96L382.62 379 271.5 328.5l-15.1 268.95-75.9-201.95-180 575 416.76-400.11L684.5 963.5l-133.74-314 305.74-153 266 384 119-232-385-329 211-68 90-252 72.96 147.13L1294.5-.5l100.43 41.27-17.43 270.73 134 173 39-134 45.17-198.4L1771.5-.5c-4 4-78 270-78 270l-225-270 82 351-173-39 94-320-404 260 174 397-385-152-172-154-87-182M173.8 391.09L.5 467.5l130.39-106.52L.5 328.5l135-174-135-75 51 135 6 8"
        />
        <path
          className="st2"
          d="M114.5 1079.5L0.5 970.5 167.1 612.47 271.5 1079.5 417.5 570.5 537.5 1079.5 684.5 958.5 801.5 1079.5 896.91 983.18 856.5 1079.5"
        />
        <path
          className="st2"
          d="M1919.5 145.5l-46.59 20.58s38.59 315.42 38.59 314.42l8 217-122.89-108.42s117.89 491.42 122.89 490.42-232-388-232-388l-323 346 357 42"
        />
        <path
          className="st2"
          d="M756.5 370.5L827.72 71.34 595.5 -0.5 856.5 219.16 643.92 145.5"
        />
        <path
          className="st2"
          d="M537.5 1079.5L568.76 793.24 271.5 1079.5 0.5 970.5 229.59 892.02 414.02 582.64 188.17 706.7 256.5 597.5"
        />
        <path
          className="st2"
          d="M896.91 983.18L1065.5 1079.5 1242.87 1023.37 1522.5 1079.5"
        />
        <path
          className="st2"
          d="M1899.45 481L1698.27 456.31 1777.5 345.5 1550.5 345.5 1698.27 522"
        />
        <path
          className="st2"
          d="M1230.5 145.5v494l153.01-225.01L1184.5 518.5c-4-10 40.03-186.01 40.03-186.01l158.97-20.99 37.36 122.25"
        />
        <path
          className="st2"
          d="M1832.51 930.05L1522.5 907.75 1711.85 731.33 1856.5 1079.5 1672.59 975.84"
        />
        <path
          className="st2"
          d="M1364.5 1037.5L1619 518.5 1427.08 804.67 1689.5 691.5"
        />
        <path className="st2" d="M1498.36 539.5L1619.5 518.5" />
        <path
          className="st2"
          d="M1237.56 639.5L1463.61 668.77 1371.44 560.2 1412.06 860.57 1243.5 648.5"
        />
        <path className="st11" d="M856.5 319.5L1126.58 79.5" />
        <path className="st12" d="M856.5 503.5L826.11 813.64" />
        <g>
          <path
            className="st2"
            d="M1028.5 254.5l-205 246v-177l328.02 199 326.98-38s-6.82-140.73-11.41-141.36-76.92-183.12-76.92-183.12L1517.5 349.5l-8-266 229-80 101.41 55.66"
          />
          <path
            className="st2"
            d="M535.5 797.5l79.17 195.32 541.42-361.01-71.73 245.27-95.95-311.47-48.39 103.11L644.6 968.18l444.9-83.68 242 157-680-79 172-455-233.3 316.06 67.22-239.95-87.72-40.41 170.78-117.02 32.38 82.85L823.5 323.5l-126.04 64.15-53.92-114.15-71.04-270-10.28 167.41L969.5 3.5 723.23 374.02 823.5 323.5l146-320 228 147 147 165-310-60 444 229-280.08 159.38 133.08 397.62 186-692 137 346L1878.76 485 1738.5 3.5l42 379 106-379-226 270c20 127-6 422-6 422s-271.17 351.98-263.58 352.99c7.58 1.01 408.59-114.44 408.59-114.44"
          />
          <path className="st2" d="M295.5 3.5L-32.5 273.5 520.5 661.5z" />
          <path
            className="st2"
            d="M238.5 332.5L195.94 85.46 -32.5 3.5 238.5 327.5 147.66 399.9 -32.5 543.5"
          />
          <path
            className="st2"
            d="M457.42 465.51L616.6 273.5 395.5 284.5 368.5 3.5 341.99 536.25 238.5 332.5 353.73 173.8 97.22 158.59 147.5 399.5 -32.5 644.5 823.5 500.5 429.5 3.5 391.68 284.78 564.5 164.5 455.41 471.16 651.5 346.5 520.5 661.5"
          />
          <path className="st2" d="M1517.5 354.5L1886.5 492.5 1660.5 273.5z" />
          <path
            className="st2"
            d="M341.5 536.5l143.42 20.96L349.62 383 238.5 332.5l-15.1 268.95-75.9-201.95-180 575 416.76-400.11L651.5 967.5l-133.74-314 305.74-153 266 384 119-232-385-329 211-68 90-252 72.96 147.13L1261.5 3.5l100.43 41.27-17.43 270.73 134 173 39-134 45.17-198.4L1738.5 3.5c-4 4-78 270-78 270l-225-270 82 351-173-39 94-320-404 260 174 397-385-152-172-154-87-182M140.8 395.09L-32.5 471.5 97.89 364.98-32.5 332.5l135-174-135-75 51 135 6 8"
          />
          <path
            className="st2"
            d="M81.5 1083.5L-32.5 974.5 134.1 616.47 238.5 1083.5 384.5 574.5 504.5 1083.5 651.5 962.5 768.5 1083.5 863.91 987.18 823.5 1083.5"
          />
          <path
            className="st2"
            d="M1886.5 149.5l-46.59 20.58s38.59 315.42 38.59 314.42l8 217-122.89-108.42s117.89 491.42 122.89 490.42-232-388-232-388l-323 346 357 42"
          />
          <path
            className="st2"
            d="M723.5 374.5L794.72 75.34 562.5 3.5 823.5 223.16 610.92 149.5"
          />
          <path
            className="st2"
            d="M504.5 1083.5L535.76 797.24 238.5 1083.5 -32.5 974.5 196.59 896.02 381.02 586.64 155.17 710.7 223.5 601.5"
          />
          <path
            className="st2"
            d="M863.91 987.18L1032.5 1083.5 1209.87 1027.37 1489.5 1083.5"
          />
          <path
            className="st2"
            d="M1866.45 485L1665.27 460.31 1744.5 349.5 1517.5 349.5 1665.27 526"
          />
          <path
            className="st2"
            d="M1197.5 149.5v494l153.01-225.01L1151.5 522.5c-4-10 40.03-186.01 40.03-186.01l158.97-20.99 37.36 122.25"
          />
          <path
            className="st2"
            d="M1799.51 934.05L1489.5 911.75 1678.85 735.33 1823.5 1083.5 1639.59 979.84"
          />
          <path
            className="st2"
            d="M1331.5 1041.5L1586 522.5 1394.08 808.67 1656.5 695.5"
          />
          <path className="st2" d="M1465.36 543.5L1586.5 522.5" />
          <path
            className="st2"
            d="M1204.56 643.5L1430.61 672.77 1338.44 564.2 1379.06 864.57 1210.5 652.5"
          />
          <path className="st11" d="M823.5 323.5L1093.58 83.5" />
          <path className="st12" d="M823.5 507.5L793.11 817.64" />
        </g>
      </g>
    </svg>
  );
}

function HT8SmallPlanet(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 624 564"
      xmlSpace="preserve"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M.376.423L.8-.035a.38.38 0 00-.651-.177.38.38 0 00.018.538C.227.381.3.414.376.423z"
        fill="url(#_Linear1HT8SmallPlanet)"
        fillRule="nonzero"
        transform="rotate(-19.89 -2505.872 1286.515) scale(1.55251) rotate(-70.222 -316.66 1089.412) rotate(137.227 -162.465 779.533) scale(525.261)"
      />
      <use
        xlinkHref="#_Image2"
        x={0}
        y={177}
        width={372}
        height={271}
        transform="rotate(-19.89 -2505.872 1286.515) scale(1.55251) rotate(-70.222 -316.66 1089.412) matrix(0 -284.284 -284.284 0 78.848 1646.94) matrix(-.00213 -.00077 -.00077 .00213 1.078 -.379)"
      />
      <use
        xlinkHref="#_Image3"
        x={94}
        y={0}
        width={242}
        height={131}
        transform="rotate(-19.89 -2505.872 1286.515) scale(1.55251) rotate(-70.222 -316.66 1089.412) scale(124.4372 -124.4372) rotate(45 15.554 -4.593) matrix(-.0022 -.00468 -.00468 .0022 1.246 .975)"
      />
      <use
        xlinkHref="#_Image4"
        x={432}
        y={82}
        width={192}
        height={324}
        transform="rotate(-19.89 -2505.872 1286.515) scale(1.55251) rotate(-70.222 -316.66 1089.412) scale(-175.8113 175.8113) rotate(-60 8.312 6.204) matrix(-.0036 .00065 .00065 .0036 2.394 -1.203)"
      />
      <use
        xlinkHref="#_Image5"
        x={401}
        y={509}
        width={27}
        height={26}
        transform="rotate(-19.89 -2505.872 1286.515) scale(1.55251) rotate(-70.222 -316.66 1089.412) scale(18.14992 -18.14992) rotate(60 80.744 -49.276) matrix(-.02292 -.0271 -.0271 .02292 24.22 -.545)"
      />
      <use
        xlinkHref="#_Image6"
        x={305}
        y={160}
        width={122}
        height={110}
        transform="rotate(-19.89 -2505.872 1286.515) scale(1.55251) rotate(-70.222 -316.66 1089.412) scale(70.5156 -70.5156) rotate(27.477 47.585 -7.228) matrix(-.00122 -.00905 -.00905 .00122 2.279 3.053)"
      />
      <defs id="defs16">
        <linearGradient
          id="_Linear1HT8SmallPlanet"
          x1={0}
          y1={0}
          x2={1}
          y2={0}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(1 0 0 -1 0 .045)"
        >
          <stop offset={0} id="stop13" stopColor="#382b58" stopOpacity={1} />
          <stop offset={0.23} id="stop14" stopColor="#343c6d" stopOpacity={1} />
          <stop offset={0.71} id="stop15" stopColor="#2b67a2" stopOpacity={1} />
          <stop offset={1} id="stop16" stopColor="#2484c6" stopOpacity={1} />
        </linearGradient>
        <image
          id="_Image2"
          width="372px"
          height="271px"
          xlinkHref="data:image/png;base64,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"
        />
        <image
          id="_Image3"
          width="242px"
          height="131px"
          xlinkHref="data:image/png;base64,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"
        />
        <image
          id="_Image4"
          width="192px"
          height="324px"
          xlinkHref="data:image/png;base64,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"
        />
        <image
          id="_Image5"
          width="27px"
          height="26px"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAaCAYAAABGiCfwAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA5UlEQVRIie3NoUsDcQDF8Xe3wbgLWuxOMNuXhhomA1HUZF03LY5tqPgn2PwHBiqIf4AgiNkkBk0zDxaOoe+9pcEw3+8w3Dc/3idCDh10H2qW1iCmlmYWM0iTx+vTn+VdlAe2aP9stGKpDnLD0rrFCqyxybGlr1yxv7U7N6mlusUKpPeQ1j/q5PIlCfkfL0GrljYLwSweQvwIjh2fP2+B/L4dNmfBMZMNi68hIQCIjwZPCcTk7mJ3GhqrgowsBocAoGr9ZpayIrD4/qplk5+FYAAA8a0IrKysrCxgO+1+vL3XS/P4mgPFBm9Ogx6pdwAAAABJRU5ErkJggg=="
        />
        <image
          id="_Image6"
          width="122px"
          height="110px"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

function HT8BigPlanet(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 1020 1020"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <g transform="translate(-215.572 -346.41)">
        <circle
          cx={725.268}
          cy={856.105}
          r={509.696}
          fill="url(#_Linear1HT8BigPlanet)"
        />
        <clipPath id="a">
          <circle cx={725.268} cy={856.105} r={509.696} />
        </clipPath>
        <g clipPath="url(#a)">
          <path
            d="M.716-.015a1.013 1.013 0 00-.09-.072l-.028-.01a2.58 2.58 0 00-.169-.057c.03.022.055.05.074.081.021.032.037.072.055.109a.602.602 0 00.037.06c.026.033.058.056.09.042L.688.137a.306.306 0 00.028-.152zM.578-.158L.576-.159l.001.002a.295.295 0 00.053.04 1.041 1.041 0 00-.052-.041zM.423-.183l.059.018a.576.576 0 00-.059-.018zM.384-.252H.383a.29.29 0 00-.151.048.34.34 0 01.09-.016.42.42 0 01.191.04.4.4 0 00-.129-.072zM.173-.259a.289.289 0 00-.152.211.519.519 0 01.071-.077C.093-.127.093-.129.095-.13c0-.003.001-.007.004-.009.088-.067.18-.137.277-.14a.302.302 0 00-.203.02zm.145.067H.311l.007.002v-.002zm.31.359a.033.033 0 00.019.006A.09.09 0 01.621.16l.007.007zm.359.081a1.547 1.547 0 00-.251-.313.07.07 0 01.005.013c.004.01-.002.023-.008.02L.731-.033c.05.045.099.094.146.145C.886.121.878.145.87.135a2.929 2.929 0 00-.137-.136.256.256 0 01-.003.039.31.31 0 01-.038.13C.681.185.668.195.655.198c.025.03.05.062.074.097.007.011-.004.03-.011.019A1.289 1.289 0 00.62.191L.61.183A.72.72 0 00.379.016a.27.27 0 00-.14-.027c-.045.007-.091.038-.121.1C.111.103.1.083.107.07c.062-.127.165-.12.25-.09.066.023.13.061.191.111L.531.058a.6.6 0 00-.076-.123L.451-.069c-.002 0-.003 0-.005-.002C.367-.157.269-.186.178-.152a.452.452 0 00-.165.148c-.007.011-.018-.008-.01-.02l.008-.011C.007-.036.003-.042.005-.051a.322.322 0 01.132-.216.296.296 0 01.232-.041.704.704 0 01.228.104c.069.045.136.102.2.169.072.076.139.164.201.264C1.005.241.994.26.987.248z"
            fill="url(#_Linear3HT8BigPlanet)"
            fillRule="nonzero"
            transform="translate(-2718.93 442.487) scale(1.9143) matrix(736.69 0 0 -736.69 1475.88 2.89)"
          />
          <path
            d="M.988.359a1.61 1.61 0 00-.323-.476.603.603 0 00-.205-.136.261.261 0 00-.096-.015.295.295 0 00-.096.028c-.034.016-.07.032-.106.025-.009-.002-.01-.028 0-.026.033.007.066-.007.098-.022.032-.014.063-.028.096-.031l.019-.001a.536.536 0 00-.143-.02.342.342 0 00-.119.02.188.188 0 00-.1.086C.006-.198-.005-.216.002-.228c.05-.085.123-.104.19-.111.001-.003.002-.005.005-.006a.52.52 0 01.295-.001.707.707 0 01.281.164c.049.046.096.099.139.16.008.01-.003.029-.01.018a.912.912 0 00-.254-.245.574.574 0 00-.356-.089c.046.006.09.017.133.034a.697.697 0 01.189.113l.038.029a.01.01 0 01.003.007c.06.054.117.12.169.193.064.09.122.192.174.303.006.013-.004.031-.01.018z"
            fill="url(#_Linear4HT8BigPlanet)"
            fillRule="nonzero"
            transform="translate(-2718.93 442.487) scale(1.9143) matrix(764.535 0 0 -764.535 1420.33 170.623)"
          />
          <path
            d="M.984.264a1.055 1.055 0 00-.316-.382.416.416 0 00-.047-.024C.495-.193.362-.174.234-.137a3.426 3.426 0 00-.143.048C.082-.086.077-.104.081-.114.075-.12.075-.138.082-.144a.624.624 0 00-.068.046C.003-.09-.006-.117.005-.126a.556.556 0 01.431-.122.569.569 0 01.225.091.49.49 0 01.062.038.023.023 0 01.006.012.817.817 0 01.094.092c.064.072.123.158.174.256.009.015-.004.038-.013.023z"
            fill="url(#_Linear5HT8BigPlanet)"
            fillRule="nonzero"
            transform="translate(-2718.93 442.487) scale(1.9143) matrix(616.263 0 0 -616.263 1479.07 172.967)"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="_Linear1HT8BigPlanet"
          x1={0}
          y1={0}
          x2={1}
          y2={0}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(1104.42 0 0 1016.34 215.582 855.596)"
        >
          <stop offset={0} stopColor="#59286e" />
          <stop offset={0.59} stopColor="#af3386" />
          <stop offset={1} stopColor="#e73a95" />
        </linearGradient>
        <linearGradient
          id="_Linear3HT8BigPlanet"
          x1={0}
          y1={0}
          x2={1}
          y2={0}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 .001)"
        >
          <stop offset={0} stopColor="#ff4d86" stopOpacity={0.5} />
          <stop offset={1} stopColor="#ff9595" stopOpacity={0.5} />
        </linearGradient>
        <linearGradient
          id="_Linear4HT8BigPlanet"
          x1={0}
          y1={0}
          x2={1}
          y2={0}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 -.001)"
        >
          <stop offset={0} stopColor="#ff4d86" stopOpacity={0.5} />
          <stop offset={1} stopColor="#ff9595" stopOpacity={0.5} />
        </linearGradient>
        <linearGradient
          id="_Linear5HT8BigPlanet"
          x1={0}
          y1={0}
          x2={1}
          y2={0}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 .007)"
        >
          <stop offset={0} stopColor="#ff4d86" stopOpacity={0.5} />
          <stop offset={1} stopColor="#ff9595" stopOpacity={0.5} />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HT8Curve(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 1937 1416"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M.334.233C.353.245.369.249.38.246.405.24.39.205.417.196c.049-.017.126.095.194.09C.655.282.642.231.688.231.74.231.77.293.836.312.906.333.989.256.991.176L.919.082C.907.143.854.162.802.139.754.119.75.104.7.117A.138.138 0 01.769.093C.79.092.803.096.819.087A.073.073 0 00.844.069.095.095 0 00.862.007L.74-.152a.094.094 0 01-.01.038c-.011.022-.035.036-.038.033.02-.02.015-.087-.002-.138L.565-.381c-.003.014-.01.038-.013.065.003.077.051.122.051.191-.024.207-.158.04-.251.063C.293-.047.249.084.204.063l.13.17z"
        fill="url(#_Linear1HT8Curve)"
        fillRule="nonzero"
        transform="scale(-2570.63) rotate(-52.448 -.272 .87)"
      />
      <defs>
        <linearGradient
          id="_Linear1HT8Curve"
          x1={0}
          y1={0}
          x2={1}
          y2={0}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 -.045)"
        >
          <stop offset={0} stopColor="#392862" />
          <stop offset={0.26} stopColor="#3c2964" />
          <stop offset={0.46} stopColor="#462e6b" />
          <stop offset={0.64} stopColor="#573576" />
          <stop offset={0.81} stopColor="#6e3f87" />
          <stop offset={0.98} stopColor="#8c4d9b" />
          <stop offset={1} stopColor="#914f9f" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HT8Stars(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 1480 860"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M0-12.926C-8.245-12.926-8.258 0 0 0c8.259 0 8.246-12.926 0-12.926"
        fill="#fde0aa"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(1689.42 1772.12) scale(4.32221)"
      />
      <path
        d="M0-34.313C-17.53-37.997-23.937-5.242-5.788-5.834 15.191 3.684 22.107-32.812 0-34.313"
        fill="#f5a291"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(3175.4 1965.29) scale(4.32221)"
      />
      <path
        d="M0-12.926C-8.246-12.926-8.259 0 0 0c8.258 0 8.245-12.926 0-12.926"
        fill="#ac91ad"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(3128.97 1765.64) scale(4.32221)"
      />
      <path
        d="M0-12.927C-8.245-12.927-8.258 0 0 0c8.259 0 8.207-12.927 0-12.927"
        fill="#aab5c3"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(1297.56 1778.6) scale(4.32221)"
      />
      <path
        d="M0-12.926C-8.232-12.926-8.245 0 0 0s8.258-12.926 0-12.926"
        fill="#aab5c3"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(2974.68 2252.26) scale(4.32221)"
      />
      <path
        d="M0-12.926C-8.233-12.926-8.246 0 0 0c8.245 0 8.296-12.926 0-12.926"
        fill="#aab5c3"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(3411.53 1622.89) scale(4.32221)"
      />
      <path
        d="M0-12.927C-8.246-12.927-8.259 0 0 0c8.258 0 8.245-12.927 0-12.927"
        fill="#a598c9"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(3276.78 2018.45) scale(4.32221)"
      />
      <path
        d="M0-24.081C-16.772-28.477-22.521-4.418-6.323.323 8.61 4.396 14.796-20.2 0-24.081"
        fill="#bfb6da"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(2873.19 2130.08) scale(4.32221)"
      />
      <path
        d="M-10.783-3.021C-19.334 18.158-21.69 19.93-44.425 21.473-5.729 47.528-56.56 75.349-10.783 50.486c45.67 25.226-4.929-3.132 33.646-28.713C.03 20.103-2.301 18.003-10.783-3.021"
        fill="#a598c9"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) scale(4.3222 -4.3222) rotate(13.62 2666.843 2992.978)"
      />
      <path
        d="M0 4.32c-14.362-22.163-39.684 14.604-11.626 16.234a32.03 32.03 0 001.131-.18C-3.573 22.163 3.535 19.181 0 4.32"
        fill="#fccfc6"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(1266.31 3027.73) scale(4.32221)"
      />
      <path
        d="M31.207 5.349c.169.346.268.672.338.985 1.408 2.456 1.65 5.554-.338 8.905-2.517 5.155-7.217 5.594-10.994 3.781-14.695 1.42-5.458-33.577 10.994-13.671"
        fill="#fccfc6"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) matrix(-3.7559 2.13886 2.13886 3.7559 2461.59 2487.75)"
      />
      <path
        d="M0 7.564c-1.01 1.252-1.354 2.746-1.273 4.193-2.294 8.882 3.252 20.059 14.048 20.479C50.134 31.736 20.284-24.672 0 7.564"
        fill="#fde0aa"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(2467.08 2749.38) scale(4.32221)"
      />
      <path
        d="M0 13.358c-1.184-3.851 4.054-7.641 6.939-5.141 2.649 2.606 2.52 6.885-2.116 6.251-.812 1.344-2.959-.746-3.156-2.322 1.127-1.003 2.704-3.497 4.56-2.7 2.019 1.557-2.53-3.393-1.559-1.964.28.162-1.156 1.849-.804 1.446-1.03.659-.283.198-1.202.54-.262.158.509-.038-.437 0l2.94 2.245c-.045.669-.295 2.437-1.446 2.161.668.213-1.662-.384-1.664-1.473 5.296 7.713 9.089-6.811.419-4.451-10.772 6.912 6.792 11.477 8.013 1.32-3.394-20.092-28.191 10.474-5.598 11.265C23.255 19.467 9.252-8.66-3.185 4.524-10.238 8.905-3.292 24.18 0 13.358"
        fill="#a598c9"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(1518.46 2719.91) scale(4.32221)"
      />
      <path
        d="M0 6.463C4.123 6.463 4.123 0 0 0c-4.122 0-4.122 6.463 0 6.463"
        fill="#a598c9"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(2855.64 2275.45) scale(4.32221)"
      />
      <path
        d="M0 6.463C4.109 6.463 4.122 0 0 0c-4.123 0-4.136 6.463 0 6.463"
        fill="#a598c9"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(2701.41 2759.67) scale(4.32221)"
      />
      <path
        d="M0 19.39C12.354 19.39 12.381 0 0 0c-12.382 0-12.382 19.39 0 19.39"
        fill="#a598c9"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(2478.62 2835.54) scale(4.32221)"
      />
      <path
        d="M0 2.515c-4.461-15.298 19.012-9.903 15.746 2.948C10.13 31.608-24.966 4.169-.794-6.019 7.757-7.447 11.198 1.95 5.453 7.245c.59 4.46 2.831-.723 2.651-1.473-.281-1.111-2.701.556-1.498-2.326C9.62.369 11.212.248 11.382 3.083 9.354 15.494 9.003-5.529 9.373-7.024c.961-1.225 6.089-1.167 7.079-.027C8.297-16.461-5.236-2.695 2.881 6.664 11.817 18.102 33.387 5.329 22.97-7.051 11.203-20.506-13.776-7.386-5.724 10.154 2.146 28.811 30.852 19.536 24.607-.37c-32.091-50.641-57.3 53.388-4.501 20.413C49.992-13.096-11.536-47.403-26.107-6.078c-14.052 38.34 46.255 59.604 59.077 20.715 17.732-50.232-70.723-54.166-49.656-2.462C-10.22 23.156 6.182 12.644 0 2.515"
        fill="#f5a291"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(1964.92 2461.74) scale(4.32221)"
      />
      <path
        d="M0-29.782c3.544 4.657-2.796 4.359-1.01 4.524-.719-.671-.667-.62.14.156-1.063-1.596.467 1.094-.333-.504.372 1.098-.148 1.172.128 0-.235 1.135-.521 1.138.218.284-2.231 1.636 2.536-1.141 0-.025 1.28-.13 1.28-.169.14-.143 1.549.107 1.695 3.647 1.651 2.585-1.302 2.721-7.4 1.403-4.851-3.115 5.352-3.442 11.931-5.526.857-4.408-17.586 2.73-7.729 24.828 7.427 18.999 19.902-3.032 7.515-34.667-9.95-28.951-12.688 3.036-16.644 20.035-7.886 29.096C11.024 10.654 33.263-38.167 1.995-44.363-44.337-44.525 4.723 16.314 0-29.782"
        fill="#aab5c3"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(2120.33 2705.29) scale(4.32221)"
      />
      <path
        d="M0 19.389C12.368 19.389 12.381 0 0 0s-12.368 19.389 0 19.389"
        fill="#aab5c3"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(2932.73 2878.84) scale(4.32221)"
      />
      <path
        d="M0 19.389C12.355 19.389 12.381 0 0 0s-12.381 19.389 0 19.389"
        fill="#aab5c3"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(1954.09 2564.44) scale(4.32221)"
      />
      <path
        d="M0 19.39C12.368 19.39 12.381 0 0 0s-12.368 19.39 0 19.39"
        fill="#766a99"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(2031.18 2296.27) scale(4.32221)"
      />
      <path
        d="M0 32.335c-8.651-2.421 5.117-10.979 6.518-13.573-2.88.265-2.665.098-4.431-.323-2.782-1.829 2.683 3.744 3.482 5.327-.169-2.956-.219 4.181.077 1.253.513-1.939-1.01 1.589.116-.091-.858 1.06-.948 1.189-.243.414.704-.776.64-.608-.41.284 1.421-1.06-1.767.35.077 0-4.892-.241-3.639-1.145-3.996-3.011.984-1.667 8.622-4.944 5.647 3.025-.405-39.668-39.704 11.033-1.479 14.101 46.762-17.297-26.039-58.862-17.254-8.54 15.131 20.255 43.795-6.489 17.08-17.573C-7.063 10.262-11.521 29.142 0 32.335"
        fill="#766a99"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) translate(1244.1 2616.76) scale(4.32221)"
      />
      <path
        d="M-14.154-4.616C-18.652 8.03-22.736 10.958-36.105 11.27c24.346 15.383-6.833 34.885 21.951 18.946 28.682 16.366-2.296-3.752 21.963-18.624-13.415-.447-17.515-3.667-21.963-16.208"
        fill="#f5a291"
        fillRule="nonzero"
        transform="translate(-1253.04 -855.817) matrix(.55452 0 0 .55452 822.363 -13.134) scale(4.3222 -4.3222) rotate(25.262 1354.884 210.937)"
      />
    </svg>
  );
}

function HT8Lines1(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 898 634"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M.98-.26a2.087 2.087 0 00-.927.505C.027.27.023.282.026.289c.005.012.019.009.027.002a2.15 2.15 0 01.935-.519c.019-.005.013-.033-.004-.033L.98-.26z"
        fill="url(#_Linear1HT8Lines1)"
        fillRule="nonzero"
        transform="translate(-1090.46 -876.086) translate(1070.52 -347.977) scale(1.48073) translate(5.037 986.75) scale(614.374)"
      />
      <path
        d="M.96-.225a2.553 2.553 0 00-.805.598.15.15 0 00-.029.056c-.009.035.007.05.029.025.16-.186.38-.382.59-.508a2.5 2.5 0 01.241-.125c.027-.012.01-.049-.015-.049a.023.023 0 00-.011.003z"
        fill="url(#_Linear2HT8Lines1)"
        fillRule="nonzero"
        transform="translate(-1090.46 -876.086) translate(1070.52 -347.977) scale(1.48073) translate(-33.292 1077.95) scale(378.714)"
      />
      <defs>
        <linearGradient
          id="_Linear1HT8Lines1"
          x1={0}
          y1={0}
          x2={1}
          y2={0}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(1 0 0 -1 0 .03)"
        >
          <stop offset={0} stopColor="#2c1753" stopOpacity={0} />
          <stop offset={1} stopColor="#efadce" />
        </linearGradient>
        <linearGradient
          id="_Linear2HT8Lines1"
          x1={0}
          y1={0}
          x2={1}
          y2={0}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(1 0 0 -1 0 .19)"
        >
          <stop offset={0} stopColor="#2c1753" stopOpacity={0} />
          <stop offset={1} stopColor="#efadce" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HT8Lines2(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 453 677"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M.884-1.411c.056.206.058.42.038.631a3.823 3.823 0 01-.913 2.13c-.029.033.019.081.047.048A3.902 3.902 0 00.981-.7a1.923 1.923 0 00-.033-.729.03.03 0 00-.03-.023c-.02 0-.041.016-.034.041z"
        fill="url(#_Linear1HT8Lines2)"
        fillRule="nonzero"
        transform="translate(-2190.34 -314.739) translate(86.835 -256.465) translate(2364.81 848.984) scale(191.257)"
      />
      <path
        d="M.967-.483a.983.983 0 01-.263.47 1.767 1.767 0 01-.692.461C-.009.456 0 .489.021.481a1.782 1.782 0 00.861-.667A.855.855 0 001-.474C1.002-.487.991-.495.981-.495a.014.014 0 00-.014.012z"
        fill="url(#_Linear2HT8Lines2)"
        fillRule="nonzero"
        transform="translate(-2190.34 -314.739) translate(86.835 -256.465) translate(2103.51 1055.63) scale(375.259)"
      />
      <path
        d="M.953-.617A3.062 3.062 0 01.011.55C-.015.57.01.616.037.596a3.107 3.107 0 00.96-1.187c.01-.021-.008-.04-.025-.04-.007 0-.015.004-.019.014z"
        fill="url(#_Linear3HT8Lines2)"
        fillRule="nonzero"
        transform="translate(-2190.34 -314.739) translate(86.835 -256.465) translate(2290.64 1099.58) scale(246.986)"
      />
      <defs>
        <linearGradient
          id="_Linear1HT8Lines2"
          x1={0}
          y1={0}
          x2={1}
          y2={0}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(1 0 0 -1 0 -.022)"
        >
          <stop offset={0} stopColor="#efadce" />
          <stop offset={1} stopColor="#2c1753" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="_Linear2HT8Lines2"
          x1={0}
          y1={0}
          x2={1}
          y2={0}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(1 0 0 -1 0 -.006)"
        >
          <stop offset={0} stopColor="#efadce" />
          <stop offset={1} stopColor="#2c1753" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="_Linear3HT8Lines2"
          x1={0}
          y1={0}
          x2={1}
          y2={0}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(1 0 0 -1 0 -.015)"
        >
          <stop offset={0} stopColor="#efadce" />
          <stop offset={1} stopColor="#2c1753" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}
