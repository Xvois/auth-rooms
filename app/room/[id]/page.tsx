

export default function PageView({ params }: { params: { slug: string } }) {
    return (
        <div>
            Room id: {params.slug}
        </div>
    )
}