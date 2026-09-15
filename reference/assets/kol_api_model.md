# KOL API 数据模型深挖（openapi.json 全量）

## 路径权限（FastAPI 公开文档，运行态仍 401/403 守卫；securitySchemes 未声明=文档疏漏)

| GET    | /api/health | params=- | body=- | Health |
| GET    | /api/auth/local-login | params=- | body=- | Local Login Available |
| POST   | /api/auth/local-login | params=- | body=LocalLogin | Local Login |
| GET    | /api/me | params=- | body=- | Me |
| GET    | /api/admin/partners | params=include_archived?,kind? | body=- | List Partners |
| POST   | /api/admin/partners | params=- | body=PartnerCreate | Create Partner |
| GET    | /api/admin/partners/dub-sync | params=- | body=- | Dub Sync |
| DELETE | /api/admin/partners/{partner_id} | params=partner_id,deactivate_in_dub? | body=- | Delete Partner |
| GET    | /api/admin/partners/{partner_id} | params=partner_id | body=- | Get Partner |
| PATCH  | /api/admin/partners/{partner_id} | params=partner_id | body=PartnerPatch | Patch Partner |
| POST   | /api/admin/partners/{partner_id}/archive | params=partner_id,deactivate_in_dub? | body=- | Archive Partner |
| POST   | /api/admin/partners/{partner_id}/codes | params=partner_id | body=CodeIssue | Issue Code |
| PATCH  | /api/admin/codes/{code} | params=code | body=CodePatch | Patch Code |
| GET    | /api/admin/promo-codes | params=- | body=- | List Promo Codes |
| POST   | /api/admin/promo-codes | params=- | body=PromoCodeCreate | Create Promo Code |
| DELETE | /api/admin/promo-codes/{code} | params=code | body=- | Delete Promo Code |
| GET    | /api/admin/code-types | params=- | body=- | List Code Types |
| POST   | /api/admin/code-types | params=- | body=CodeTypeCreate | Create Code Type |
| PATCH  | /api/admin/code-types/{code_type} | params=code_type | body=CodeTypePatch | Patch Code Type |
| GET    | /api/admin/redemptions | params=partner_id?,code?,limit? | body=- | List Redemptions |
| GET    | /api/admin/stats | params=- | body=- | Stats |
| GET    | /api/admin/campaigns | params=include_archived? | body=- | List Campaigns |
| POST   | /api/admin/campaigns | params=- | body=CampaignCreate | Create Campaign |
| GET    | /api/admin/campaigns/{campaign_id} | params=campaign_id,days? | body=- | Get Campaign |
| PATCH  | /api/admin/campaigns/{campaign_id} | params=campaign_id | body=CampaignPatch | Patch Campaign |
| DELETE | /api/admin/campaigns/{campaign_id} | params=campaign_id | body=- | Delete Campaign |
| POST   | /api/admin/campaigns/{campaign_id}/archive | params=campaign_id | body=- | Archive Campaign |
| GET    | /api/admin/campaigns/{campaign_id}/qr.png | params=campaign_id,scale? | body=- | Campaign Qr Png |
| GET    | /api/admin/campaigns/{campaign_id}/qr.svg | params=campaign_id,scale? | body=- | Campaign Qr Svg |
| GET    | /api/kol/codes | params=- | body=- | My Codes |
| GET    | /api/kol/redemptions | params=limit? | body=- | My Redemptions |
| GET    | /api/kol/dub/summary | params=- | body=- | My Dub Summary |
| GET    | /api/kol/dub/commissions | params=page?,pageSize?,status? | body=- | My Commissions |
| GET    | /api/kol/dub/payouts | params=- | body=- | My Payouts |
| GET    | /r/{slug} | params=slug | body=- | Scan |
| POST   | /api/campaigns/events | params=- | body=CampaignEvent | Record Event |
| GET    | /{full_path} | params=full_path | body=- | Spa |