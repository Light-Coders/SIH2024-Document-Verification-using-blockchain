import { Card, Flex, Text } from '@mantine/core'

import ReactDOM from 'react-dom';
import {QRCodeSVG} from 'qrcode.react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

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
	const [opened, { open, close }] = useDisclosure(false);
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
			<Button
				onClick={open}
				color="blue"
				size="md"
				variant="filled"
				radius="md"
				style={{ 
					marginTop: '1rem',
					maxWidth: '200px'
				}}
			>
				Show QR Code
			</Button>		     	     	
     <Modal opened={opened} onClose={close} title="QR" centered>
				  <QRCodeSVG value="https://reactjs.org/" size="300" style={{ marginLeft: "auto", marginRight: "auto", width: "100%" }}/>
      </Modal>

		</Card>
	)
}
