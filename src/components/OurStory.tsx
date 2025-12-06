const OurStory = () => {
  return (
    <section id="story" className="py-20 bg-secondary">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl bg-muted flex items-center justify-center">
              <div className="text-center p-8">
                <span className="font-brand text-4xl text-primary">miracle Cakes</span>
                <p className="text-muted-foreground mt-2">Bakery</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              Who is behind the magic? Journey into the Miracle Cakes workshop to learn about our founder's passion, our commitment to using the finest local and international ingredients, and the love we pour into every single order.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From humble beginnings in a Piliyandala kitchen, Miracle Cakes was born out of a desire to create cakes that are as beautiful to look at as they are delicious to eat. We believe every celebration deserves a spectacular centerpiece, and we're honored to be a part of your special moments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;