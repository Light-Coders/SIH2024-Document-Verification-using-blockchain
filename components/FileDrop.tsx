import { Button, Group, Text, rem, Image } from '@mantine/core'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useRef, useState } from 'react'

function FileDrop(props: Partial<DropzoneProps>) {
	const openRef = useRef<() => void>(null)
	const [file, setFile] = useState<File | null>(null)

	const handleDrop = (files: File[]) => {
		if (files.length > 0) {
			setFile(files[0])
		}
	}

	return (
		<>
			<h1 style={{ textAlign: 'center' }}>Upload</h1>
			{file ? (
				<div
					style={{
						textAlign: 'center',
						height: '20rem',
						width: '20rem',
						margin: 'auto',
					}}
				>
					<Image
						src={URL.createObjectURL(file)}
						alt="Uploaded file"
						radius="md"
						fit="contain"
					/>
					<Button mt="md" onClick={() => setFile(null)}>
						Upload Another File
					</Button>
				</div>
			) : (
				<Dropzone
					openRef={openRef}
					onDrop={handleDrop}
					onReject={(files) => console.log('rejected files', files)}
					maxSize={5 * 1024 ** 2}
					accept={IMAGE_MIME_TYPE}
					style={{
						border: '2px dotted #4262FF',
						padding: '1rem',
						marginBottom: '2rem',
					}}
					{...props}
				>
					<Group
						justify="center"
						gap="xl"
						mih={220}
						style={{ pointerEvents: 'none' }}
					>
						<Dropzone.Accept>
							<IconUpload
								style={{
									width: rem(52),
									height: rem(52),
									color: '#4262FF',
									cursor: 'pointer',
								}}
								stroke={1.5}
							/>
						</Dropzone.Accept>
						<Dropzone.Reject>
							<IconX
								style={{
									width: rem(52),
									height: rem(52),
									color: '#4262FF',
								}}
								stroke={1.5}
							/>
						</Dropzone.Reject>
						<Dropzone.Idle>
							<IconPhoto
								style={{
									width: rem(52),
									height: rem(52),
									color: '#4262FF',
								}}
								stroke={1.5}
							/>
						</Dropzone.Idle>

						<div>
							<Text size="xl" inline>
								Drag and Drop QR
							</Text>
							<Text size="sm" c="dimmed" inline mt={7}>
								Supported Formats: JPEG, JPG, PNG. File size:
								5Mb
							</Text>
						</div>
					</Group>
					{!file && (
						<Group justify="center" mt="md">
							<Button
								onClick={() => openRef.current?.()}
								style={{ backgroundColor: '#4262FF' }}
							>
								Select files
							</Button>
						</Group>
					)}
				</Dropzone>
			)}
		</>
	)
}

export default FileDrop
