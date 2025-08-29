export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="md:col-span-1">
          <div className="font-serif text-4xl font-semibold tracking-wide">LAYERS</div>
          <p className="mt-3 text-sm opacity-70">Essentials built for every layer of life.</p>
        </div>
        <div>
          <h3 className="mb-3 font-medium">Navigation</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>
              <a href="/collection/t-shirts">Collection</a>
            </li>
            <li>
              <a href="/collection/t-shirts">Product</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-medium">Info</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>
              <a href="/news">News</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/support">Support</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-medium">Social</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>
              <a href="#" aria-label="Facebook">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" aria-label="Instagram">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" aria-label="X / Twitter">
                X/Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 md:px-6">
          <p className="text-xs opacity-70">© {year} Layers Clothing</p>
          <p className="text-xs opacity-70">All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
