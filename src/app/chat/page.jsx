import Message from "/components/Message";
import SendMessage from "/components/SendMessage";
import styles from "/css/messages.module.css";

export default function Chat() {
    return (
        <>
        <div className={styles.conversation}>
            <div className={styles.messagesContainer}>
                <Message 
                    message={"asdfjaldkfj"}
                    author={"Joel"}
                    image={"https://s2.abcstatics.com/media/bienestar/2022/06/01/jesus-matos-2-kQVC--1248x698@abc.png"}
                />
                <Message 
                    message={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit nihil voluptas incidunt minima eos illo, odio, quia a, hic pariatur aut. Dolore fuga nihil voluptas doloremque, earum eveniet illum quo."}
                    author={"Joel"}
                    image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s"}
                />
                <Message 
                    message={"HOla"}
                    author={"Aaron"}
                    image={"https://www.trendtic.cl/wp-content/uploads/2018/05/003-Rub%C3%A9n-Belluomo-INFOR-2018.jpg"}
                />
                 <Message 
                    message={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat quibusdam est quas rem excepturi rerum odio aspernatur natus suscipit, incidunt consequatur aliquid voluptatibus eligendi velit repellendus exercitationem dolorem animi nobis fugit officiis cupiditate accusamus. Praesentium excepturi dicta dignissimos earum cum, officia veniam vitae quidem nisi, laborum itaque quod non saepe adipisci, ducimus facere quos quo debitis aut at? Optio beatae harum, illo possimus, quibusdam dolore vel iste ipsum sint, dicta deleniti. Rem eligendi, reiciendis odit eveniet culpa, minima ullam eos doloremque eum labore quas quos dolor cum praesentium. Voluptatem quisquam rerum voluptatibus, aliquid culpa alias inventore commodi ipsa, non voluptates aspernatur unde natus quo recusandae quis velit soluta, facere sit! Labore rem eum voluptas. Officiis dolorum tempore dicta repudiandae pariatur quam incidunt ducimus impedit sequi, consectetur non sed dignissimos. Deleniti reprehenderit sit porro inventore quas aspernatur reiciendis repudiandae aliquid. Accusantium corporis, tempora pariatur sed porro eos molestiae! Debitis ipsum praesentium, inventore saepe distinctio placeat ratione nulla, molestiae in, atque minus! Unde optio dolorem esse, quaerat expedita odio quis? Dignissimos animi modi hic laudantium quam corporis aut culpa? Officia numquam facere praesentium libero, voluptatum voluptatem sint eaque obcaecati ullam iure fuga repellendus hic aliquam ipsam blanditiis officiis harum, ratione quia voluptates!"}
                    author={"Berlín"}
                    image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s"}
                />
                <Message 
                    message={"Adiós"}
                    author={"Joel"}
                    image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s"}
                />
                <Message 
                    message={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit nihil voluptas incidunt minima eos illo, odio, quia a, hic pariatur aut. Dolore fuga nihil voluptas doloremque, earum eveniet illum quo."}
                    author={"Joel"}
                    image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s"}
                />
                <Message 
                    message={"HOla"}
                    author={"Aaron"}
                    image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s"}
                />
                 <Message 
                    message={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat quibusdam est quas rem excepturi rerum odio aspernatur natus suscipit, incidunt consequatur aliquid voluptatibus eligendi velit repellendus exercitationem dolorem animi nobis fugit officiis cupiditate accusamus. Praesentium excepturi dicta dignissimos earum cum, officia veniam vitae quidem nisi, laborum itaque quod non saepe adipisci, ducimus facere quos quo debitis aut at? Optio beatae harum, illo possimus, quibusdam dolore vel iste ipsum sint, dicta deleniti. Rem eligendi, reiciendis odit eveniet culpa, minima ullam eos doloremque eum labore quas quos dolor cum praesentium. Voluptatem quisquam rerum voluptatibus, aliquid culpa alias inventore commodi ipsa, non voluptates aspernatur unde natus quo recusandae quis velit soluta, facere sit! Labore rem eum voluptas. Officiis dolorum tempore dicta repudiandae pariatur quam incidunt ducimus impedit sequi, consectetur non sed dignissimos. Deleniti reprehenderit sit porro inventore quas aspernatur reiciendis repudiandae aliquid. Accusantium corporis, tempora pariatur sed porro eos molestiae! Debitis ipsum praesentium, inventore saepe distinctio placeat ratione nulla, molestiae in, atque minus! Unde optio dolorem esse, quaerat expedita odio quis? Dignissimos animi modi hic laudantium quam corporis aut culpa? Officia numquam facere praesentium libero, voluptatum voluptatem sint eaque obcaecati ullam iure fuga repellendus hic aliquam ipsam blanditiis officiis harum, ratione quia voluptates!"}
                    author={"Berlín"}
                    image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s"}
                />
                <Message 
                    message={"Adiós"}
                    author={"Joel"}
                    image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s"}
                />
            </div>
            <SendMessage />
        </div>
        </>
    )
}

