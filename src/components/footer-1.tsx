import {
  ChevronRightIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const footerNavs = [
  {
    label: "Services",
    items: [
      {
        href: "/#features",
        name: "Virtual Assistants",
      },
      {
        href: "/#pricing",
        name: "Pricing",
      },
      {
        href: "/playbooks",
        name: "Playbooks",
      },
      {
        href: "mailto:support@stafflyhq.ai",
        name: "Support",
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        href: "/#our-story",
        name: "Our Story",
      },
      {
        href: "/jobs",
        name: "Careers",
      },
      {
        href: "/contact",
        name: "Contact",
      },
    ],
  },
  {
    label: "Legal",
    items: [
      {
        href: "/privacy",
        name: "Privacy Policy",
      },
      {
        href: "/terms",
        name: "Terms of Service",
      },
    ],
  },
]

const footerSocials = [
  {
    href: "https://www.linkedin.com/company/stafflyhq",
    name: "Linkedin",
    icon: <LinkedInLogoIcon className="size-4" />,
  },
  {
    href: "https://twitter.com/stafflyhq",
    name: "Twitter",
    icon: <TwitterLogoIcon className="size-4" />,
  },
]

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="gap-4 p-4 py-16 sm:pb-16 md:flex md:justify-between">
          <div className="mb-12 flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2">
              <img
                className="h-12 w-auto"
                src="/staffly-logo.svg"
                alt="Staffly"
              />
            </a>
            <div className="max-w-sm">
              <div className="z-10 mt-4 flex w-full flex-col items-start text-left">
                <h1 className="text-3xl font-bold lg:text-2xl">
                  Ready to scale?
                </h1>
                <p className="mt-2 text-slate-600">
                  Hire A+ operators for 60% less. Get matched with qualified Filipino VAs today.
                </p>
                <a
                  href="/#chat"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      variant: "default",
                    }),
                    "mt-4 w-full bg-blue-600 hover:bg-blue-700 rounded-full px-6 text-sm font-semibold tracking-tighter transition-all ease-out hover:ring-2 hover:ring-blue-600 hover:ring-offset-2"
                  )}
                >
                  Start Scaling
                  <ChevronRightIcon className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {footerNavs.map((nav) => (
              <div key={nav.label}>
                <h2 className="mb-6 text-sm font-semibold text-neutral-900 uppercase dark:text-white">
                  {nav.label}
                </h2>
                <ul className="grid gap-2">
                  {nav.items.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug font-medium text-neutral-400 duration-200 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                      >
                        {item.name}
                        <ChevronRightIcon className="h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t py-4 sm:flex sm:flex-row sm:items-center sm:justify-between">
          <div className="flex space-x-5 sm:mt-0 sm:justify-center">
            {footerSocials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="fill-neutral-500 text-neutral-500 hover:fill-neutral-900 hover:text-neutral-900 dark:hover:fill-neutral-600 dark:hover:text-neutral-600"
              >
                {social.icon}
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>
          <span className="text-sm tracking-tight text-neutral-500 sm:text-center dark:text-neutral-400">
            Copyright © {new Date().getFullYear()}{" "}
            <a href="/" className="cursor-pointer hover:text-blue-600">
              Staffly
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
