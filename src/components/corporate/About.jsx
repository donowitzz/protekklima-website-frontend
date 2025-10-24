import Certificates from "./Certificates";
const basePath = import.meta.env.BASE_URL;

export default function About() {
  return (
    <div>
      {/* Header */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        <img 
          src={`${basePath}images/navbar-foto111.jpg`}
          alt="ProtekKlima"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>

        <div data-aos="zoom-in" className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 ">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">Hakkımızda</h1>
          <p className="text-xl max-w-3xl mx-auto text-white">
            SoğutmaPro olarak 25 yılı aşkın süredir klima ve soğutma sistemleri
            sektöründe hizmet vermekteyiz.
          </p>
        </div>
      </section>

      {/* İçerik */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-bold mb-6 text-regal-blue">Şirketimiz Hakkında</h2>
              <p className="text-dark-gray mb-4">
                1997 yılından bu yana soğutma ve iklimlendirme teknolojileri alanında çalışmakta olan  PROTEK KLİMA ısıtma, soğutma ve havalandırma konularında hizmet vermek üzere 1 Mart  2013 yılından itibaren ticari firma olarak  faaliyete başlamıştır.
              </p>
              <p className="text-dark-gray mb-4">
                Dünya'nın önde gelen klima ve soğutma sistemi üreticileri ile
                çalışarak, en son teknoloji ürünleri müşterilerimize sunuyoruz.
                Satış öncesi danışmanlık, profesyonel montaj ve satış sonrası
                teknik destek hizmetlerimiz ile tam bir çözüm ortağı olarak
                yanınızdayız.
              </p>
              <p className="text-dark-gray mb-4">
               Protek Klima; teknik konularda verimli olması etkili sorun çözme kalitesi ile birleştirerek yüksek özveri ile çalışan, dinamik bir firmadır.
               Protek Klima, yaptığı işin arkasında duran, güven veren, samimi olan, en değerli iş ortağının müşteri olduğunun bilen, yüksek hizmet kalitesini önemseyen, bilgisini ve uzmanlığını paylaşarak büyüyeceğine inanan, insan gücüyle, işini en iyi şekilde yapan ve sürekli geliştirme azmiyle beslenen, gelecekten umutlu ve mutlu insan kaynağıyla, hizmet standardını önemseyen bir çalışma anlayışına sahiptir.
              </p>
              <p className="text-dark-gray">
                Güvenirlik, çözüm üretmek, hizmet odaklılık, paylaşmak, uzmanlık,  mutluluk ve kalite değerleri bu anlayışın temelini oluşturmaktadır.
              </p>
            </div>

            {/* Sayılar */}
            <div data-aos="fade-left" className="grid grid-cols-2 gap-4">
              {[
                ["25+", "Yıllık Deneyim"],
                ["5000+", "Tamamlanan Proje"],
                ["20+", "Uzman Teknisyen"],
                ["10+", "Marka İş Ortaklığı"],
              ].map(([number, label]) => (
                <div
                  key={label}
                  className="bg-white p-6 rounded-lg text-center shadow-md"
                >
                  <div className="text-3xl font-bold text-theme-hover mb-2">
                    {number}
                  </div>
                  <p className="text-dark-gray">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sertifikalar Bölümü */}
          <div data-aos="zoom-out" className="mt-20 max-w-6xl mx-auto text-regal-blue">
            <Certificates />
          </div>
        </div>
      </section>
    </div>
  );
}
