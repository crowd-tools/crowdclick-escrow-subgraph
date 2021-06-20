import { BigInt } from "@graphprotocol/graph-ts"
import {
  CrowdclickEscrow,
  CampaignCreated,
  OwnershipTransferred,
  PublisherWithdrawalEmitted,
  RewardForwarded,
  UserWithdrawalEmitted
} from "../generated/CrowdclickEscrow/CrowdclickEscrow"
import { Publisher } from "../generated/schema"

export function handleCampaignCreated(event: CampaignCreated): void {
  let entity = Publisher.load(event.transaction.from.toHex())

  if (entity == null) {
    entity = new Publisher(event.transaction.from.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)

  entity.address = event.params.publisher
  entity.campaignBudget = event.params.campaignBudget
  entity.campaignUrl = event.params.campaignUrl

  entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePublisherWithdrawalEmitted(
  event: PublisherWithdrawalEmitted
): void {}

export function handleRewardForwarded(event: RewardForwarded): void {}

export function handleUserWithdrawalEmitted(
  event: UserWithdrawalEmitted
): void {}
