export interface ServiceSettings {
  singleton?: boolean,
  routable?: boolean
}

export interface OnInit {
  onInit(): void
}