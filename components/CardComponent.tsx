import { Card, Flex, Text } from '@mantine/core'

type CardProps = {
	documentName: string
	documentIssuer: string
	ethAddress: string
	documentHolder: string
}

export default function CardComponent({
	documentName,
	documentIssuer,
	ethAddress,
	documentHolder,
}: CardProps) {
	return (
		<Card shadow="sm" padding="md" radius="md" withBorder>
			<Flex direction="row" wrap="wrap" justify="space-between">
				<div>
					<Text fw={700} size="sm" c="#050038">
						{documentName}
					</Text>
					<Text size="xs">{documentIssuer}</Text>
				</div>
				<div style={{ textAlign: 'right' }}>
					<Text inline size="xs" style={{ lineHeight: 1 }}>
						To:{' '}
						<span style={{ color: '#0584c3' }}>{ethAddress}</span>
					</Text>
					<Text size="xs" mt="xs" c="#050038">
						{documentHolder}
					</Text>
				</div>
			</Flex>
		</Card>
	)
}
